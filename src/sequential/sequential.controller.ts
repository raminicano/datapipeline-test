import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { SequentialService } from './sequential.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FetchAndProcessDto } from './dto/sequential.dto';

@Controller('sequential')
@ApiTags('Sequential')
export class SequentialController {
  constructor(private readonly sequentialService: SequentialService) {}

  @Get('fetch-and-process')
  @ApiOperation({ summary: 'Fetch and process restaurant data sequentially' })
  @ApiResponse({ status: 200, description: 'Data processed successfully.' })
  @ApiResponse({ status: 400, description: 'Failed to process data.' })
  async fetchAndProcessData(@Query(ValidationPipe) query: FetchAndProcessDto) {
    const { start, end, batchSize } = query;
    return await this.sequentialService.fetchAndProcessData(
      start,
      end,
      batchSize,
    );
  }
}
