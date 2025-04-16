import { IsString, IsOptional, IsNumber, IsInt } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsString()
  status: string;

  @IsNumber()
  price: number;

  @IsInt()
  categoryId: number;
}
