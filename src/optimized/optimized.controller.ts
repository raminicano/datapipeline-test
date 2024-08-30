import { Controller, Get, Query } from '@nestjs/common';
import { OptimizedService } from './optimized.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FetchAndProcessDto } from './dto/optimized.dto';

@Controller('optimized')
@ApiTags('Optimized')
export class OptimizedController {
  constructor(private readonly optimizedService: OptimizedService) {}

  @Get('fetch-and-process')
  @ApiOperation({
    summary: 'Fetch and process restaurant data using optimized method',
  })
  @ApiResponse({ status: 200, description: 'Data processed successfully.' })
  @ApiResponse({ status: 400, description: 'Failed to process data.' })
  async fetchAndProcessData(@Query() query: FetchAndProcessDto) {
    const { start, end, batchSize } = query;
    return await this.optimizedService.fetchAndProcessData(
      start,
      end,
      batchSize,
    );
  }
}
