import { Controller, Get } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('restaurants')
@ApiTags('Restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get('fetch-and-process-sample')
  @ApiOperation({ summary: 'Fetch and process restaurant data' })
  @ApiResponse({ status: 200, description: 'Data processed successfully.' })
  @ApiResponse({ status: 400, description: 'Failed to process data.' })
  async fetchAndProcessData() {
    await this.restaurantService.fetchAndProcessData();
    return { message: 'Data processed successfully' };
  }
}
