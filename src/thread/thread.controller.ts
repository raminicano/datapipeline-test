import { Controller, Get, Query } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FetchAndProcessDto } from './dto/thread.dto';

@Controller('thread')
@ApiTags('Thread')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Get('fetch-and-process')
  @ApiOperation({
    summary: 'Fetch and process restaurant data using thread method',
  })
  @ApiResponse({ status: 200, description: 'Data processed successfully.' })
  @ApiResponse({ status: 400, description: 'Failed to process data.' })
  async fetchAndProcessData(@Query() query: FetchAndProcessDto) {
    const { start, end, batchSize } = query;
    return await this.threadService.fetchAndProcessData(start, end, batchSize);
  }
}
