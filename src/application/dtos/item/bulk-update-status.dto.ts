import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class BulkUpdateStatusDto {
  @ApiProperty({
    example: [1, 2, 3],
    description: 'IDs dos itens a serem atualizados',
  })
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];

  @ApiProperty({
    example: 'em_estoque',
    description: 'Novo status para todos os itens',
  })
  @IsString()
  status: string;
}
