import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ItemStatus } from './item-status.enum';

export class UpdateItemDto {
  @ApiProperty({ example: 'Camiseta Básica' })
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

  @ApiProperty({ example: 'Azul' })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({ example: 'em_estoque' })
  @IsEnum(ItemStatus, { message: 'status deve ser um dos valores permitidos' })
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
