import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetItemsQueryDto {
  @ApiPropertyOptional({
    example: 20,
    description: 'Quantidade de itens por página',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  take?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'ID do último item carregado (cursor)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  cursor?: number;
}
