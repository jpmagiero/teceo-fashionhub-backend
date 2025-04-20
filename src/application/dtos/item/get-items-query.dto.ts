import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetItemsQueryDto {
  @ApiPropertyOptional({
    example: 20,
    description: 'Number of items per page',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  take?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Last item loaded (cursor)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  cursor?: number;
}
