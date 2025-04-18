import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

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
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ example: 79.9 })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  categoryId?: number;
}
