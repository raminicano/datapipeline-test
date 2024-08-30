import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../restaurant/entity/restaurant.entity';
import { processAndSaveData } from '../common/preprocessing';

@Injectable()
export class OptimizedService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async fetchAndProcessData(start: number, end: number, batchSize: number) {
    try {
      const startTime = Date.now();

      const tasks = [];
      for (let i = start; i <= end; i += batchSize) {
        const batchEnd = Math.min(i + batchSize - 1, end);
        const apiUrl = `http://openapi.seoul.go.kr:8088/${process.env.API_KEY}/json/LOCALDATA_072404/${i}/${batchEnd}/`;

        const task = axios
          .get(apiUrl)
          .then((response) => {
            // async await는 api응답을 제대로 받고 난 후 데이터 베이스 작업을 수행하기에 제외
            if (response) {
              const rawData = response.data.LOCALDATA_072404.row;

              // 데이터를 받아오면 비동기적으로 데이터베이스에 저장
              return processAndSaveData(rawData, this.restaurantRepository);
            } else {
              console.log(
                `No valid data received from API for range ${i} to ${batchEnd}`,
              );
            }
          })
          .catch((error) => {
            console.error(
              `Failed to fetch data from ${i} to ${batchEnd}:`,
              error.message,
            );
          });

        tasks.push(task);
      }

      // 모든 비동기 작업이 완료될 때까지 기다림
      await Promise.all(tasks);

      const endTime = Date.now();
      const duration = endTime - startTime;

      return {
        message: 'Data processed successfully',
        duration: `${duration} ms`,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to fetch and process data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
