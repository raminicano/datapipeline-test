import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FetchAndProcessDto {
  @ApiProperty({ description: 'Start index for data fetch', type: Number })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  start: number;

  @ApiProperty({ description: 'End index for data fetch', type: Number })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  end: number;

  @ApiProperty({
    description: 'Number of records to fetch per request',
    type: Number,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  batchSize: number;
}
