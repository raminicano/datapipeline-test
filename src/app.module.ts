import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantService } from './restaurant/restaurant.service';
import { RestaurantController } from './restaurant/restaurant.controller';
import { Restaurant } from './restaurant/entity/restaurant.entity';
import { Location } from './restaurant/entity/location.entity';
import { dataSource } from './common/database.config';
import { SequentialService } from './sequential/sequential.service';
import { SequentialController } from './sequential/sequential.controller';
import { OptimizedController } from './optimized/optimized.controller';
import { OptimizedService } from './optimized/optimized.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options), // 여기서 databaseConfig를 사용하여 TypeORM 설정
    TypeOrmModule.forFeature([Restaurant, Location]), // 특정 엔티티 모듈 가져오기
  ],
  controllers: [
    RestaurantController,
    SequentialController,
    OptimizedController,
  ], // 컨트롤러 등록
  providers: [RestaurantService, SequentialService, OptimizedService], // 서비스 등록
})
export class AppModule {}
