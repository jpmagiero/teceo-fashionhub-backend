import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsEnum } from 'class-validator';
import { ItemStatus } from './item-status.enum';

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
  @IsEnum(ItemStatus, { message: 'status deve ser um dos valores permitidos' })
  status: ItemStatus;
}
