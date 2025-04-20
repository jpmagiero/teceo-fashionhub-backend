import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsEnum } from 'class-validator';
import { ItemStatus } from './item-status.enum';

export class BulkUpdateStatusDto {
  @ApiProperty({
    example: [1, 2, 3],
    description: 'Item IDs to be updated',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];

  @ApiProperty({
    example: 'in_stock',
    description: 'New status for all items',
  })
  @IsEnum(ItemStatus, { message: 'status must be one of the allowed values' })
  status: ItemStatus;
}
