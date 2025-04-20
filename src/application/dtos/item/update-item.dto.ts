import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ItemStatus } from './item-status.enum';

export class UpdateItemDto {
  @ApiProperty({ example: 'Basic T-shirt' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Nike' })
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiProperty({ example: 'M' })
  @IsString()
  @IsOptional()
  size?: string;

  @ApiProperty({ example: 'Blue' })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({ example: 'in_stock' })
  @IsEnum(ItemStatus, { message: 'status must be one of the allowed values' })
  @IsOptional()
  status?: ItemStatus;

  @ApiProperty({ example: 79.9 })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  categoryId?: number;
}
