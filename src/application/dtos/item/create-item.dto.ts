import { IsString, IsOptional, IsNumber, IsInt, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ItemStatus } from './item-status.enum';

export class CreateItemDto {
  @ApiProperty({ example: 'Basic T-shirt', description: 'Item name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Zara', description: 'Item brand' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ example: 'M', description: 'Item size' })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiProperty({ example: 'Black', description: 'Item color' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ example: 'New', description: 'Item status' })
  @IsEnum(ItemStatus, { message: 'status must be one of the allowed values' })
  status: ItemStatus;

  @ApiProperty({ example: 100, description: 'Item price' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 1, description: 'Category ID' })
  @IsInt()
  categoryId: number;
}
