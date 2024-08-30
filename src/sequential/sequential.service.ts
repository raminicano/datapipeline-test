import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../restaurant/entity/restaurant.entity';
import { processAndSaveData } from '../common/preprocessing'; // 전처리 모듈 가져오기

@Injectable()
export class SequentialService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async fetchAndProcessData(start: number, end: number, batchSize: number) {
    try {
      // 시작 시간 기록
      const startTime = Date.now();

      console.log(`start: ${start}, end: ${end}, batchSize: ${batchSize}`);
      console.log(
        `print type of start: ${typeof start}, end: ${typeof end}, batchSize: ${typeof batchSize}`,
      );

      for (let i = start; i <= end; i += batchSize) {
        console.log(
          `Fetching and processing data from ${i} to ${i + batchSize - 1}`,
        );
        const batchEnd = i + batchSize - 1; // 각 요청의 종료 인덱스 계산
        console.log(`Fetching and processing data from ${i} to ${batchEnd}`);
        const API_URL = `http://openapi.seoul.go.kr:8088/${process.env.API_KEY}/json/LOCALDATA_072404/${i}/${batchEnd}/`;
        console.log(API_URL);

        // 1. API로부터 데이터 가져오기
        const response = await axios.get(API_URL);
        const rawData = response.data.LOCALDATA_072404.row;

        // 2. 데이터 전처리 및 저장 (preprocessing.ts에서 가져옴)
        await processAndSaveData(rawData, this.restaurantRepository);
      }

      // 종료 시간 기록
      const endTime = Date.now();

      // 총 걸린 시간 계산 (밀리초 단위)
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
