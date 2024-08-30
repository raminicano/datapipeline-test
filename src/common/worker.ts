import { parentPort, workerData } from 'worker_threads';
import { DataSource } from 'typeorm';
import axios from 'axios';
import { databaseConfig } from './database.config';
import { Restaurant } from '../restaurant/entity/restaurant.entity';
import { processAndSaveData } from './preprocessing';

const start = async () => {
  const { start, end, apiKey } = workerData;

  // 새로운 DataSource를 생성하여 데이터베이스에 연결
  const dataSource = new DataSource(databaseConfig);
  await dataSource.initialize();

  const restaurantRepository = dataSource.getRepository(Restaurant);

  const apiUrl = `http://openapi.seoul.go.kr:8088/${apiKey}/json/LOCALDATA_072404/${start}/${end}/`;

  try {
    const response = await axios.get(apiUrl);
    if (response) {
      const rawData = response.data.LOCALDATA_072404.row;

      // 데이터를 받아오면 비동기적으로 데이터베이스에 저장
      await processAndSaveData(rawData, restaurantRepository);

      // 작업 완료 메시지 전송
      parentPort.postMessage('done');
    } else {
      console.log(
        `No valid data received from API for range ${start} to ${end}`,
      );
      parentPort.postMessage('done');
    }
  } catch (error) {
    console.error(
      `Failed to fetch data from ${start} to ${end}:`,
      error.message,
    );
    parentPort.postMessage('done');
  } finally {
    await dataSource.destroy(); // DataSource를 종료하여 연결을 닫습니다.
  }
};

start();
