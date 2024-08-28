import { Module } from '@nestjs/common';
import { SequentialService } from './sequential.service';

@Module({
  providers: [SequentialService],
})
export class SequentialModule {}
