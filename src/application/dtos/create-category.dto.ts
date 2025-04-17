import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Roupas', description: 'Nome da categoria' })
  @IsString()
  name: string;
}
