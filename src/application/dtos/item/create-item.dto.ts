import { IsString, IsOptional, IsNumber, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ example: 'Jaqueta jeans', description: 'Nome do item' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Zara', description: 'Marca do item' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ example: 'M', description: 'Tamanho do item' })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiProperty({ example: 'Preto', description: 'Cor do item' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ example: 'Novo', description: 'Status do item' })
  @IsString()
  status: string;

  @ApiProperty({ example: 100, description: 'Preço do item' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 1, description: 'ID da categoria' })
  @IsInt()
  categoryId: number;
}
