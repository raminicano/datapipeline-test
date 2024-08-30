import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../restaurant/entity/restaurant.entity';
import { Worker } from 'worker_threads';
import { join } from 'path';

@Injectable()
export class ThreadService {
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

        const task = new Promise<void>((resolve, reject) => {
          const worker = new Worker(join(__dirname, '../common/worker.js'), {
            workerData: {
              start: i,
              end: batchEnd,
              apiKey: process.env.API_KEY,
            },
          });

          worker.on('message', resolve);
          worker.on('error', reject);
          worker.on('exit', (code) => {
            if (code !== 0) {
              reject(new Error(`Worker stopped with exit code ${code}`));
            }
          });
        });

        tasks.push(task);
      }

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
