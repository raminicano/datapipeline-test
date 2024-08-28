import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entity/restaurant.entity';
import { Location } from './entity/location.entity';
import { processAndSaveData } from '../common/preprocessing'; // 전처리 모듈 가져오기
import * as dotenv from 'dotenv'; // dotenv 불러오기
// load dotenv
dotenv.config();

@Injectable()
export class RestaurantService {
  private readonly API_URL = `http://openapi.seoul.go.kr:8088/${process.env.API_KEY}/json/LOCALDATA_072404/1/5/`;

  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async fetchAndProcessData() {
    try {
      // 1. API로부터 데이터 가져오기
      const response = await axios.get(this.API_URL);
      const rawData = response.data.LOCALDATA_072404.row;

      // 2. 데이터 전처리 및 저장 (preprocessing.ts에서 가져옴)
      await processAndSaveData(
        rawData,
        this.restaurantRepository,
        this.locationRepository,
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to fetch and process data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
