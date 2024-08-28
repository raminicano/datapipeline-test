import { Module } from '@nestjs/common';
import { OptimizedService } from './optimized.service';
import { OptimizedController } from './optimized.controller';

@Module({
  providers: [OptimizedService],
  controllers: [OptimizedController],
})
export class OptimizedModule {}
