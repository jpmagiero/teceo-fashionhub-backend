import { ApiProperty } from '@nestjs/swagger';

export class ItemResponseDto {
  @ApiProperty({ example: 508 })
  id: number;

  @ApiProperty({ example: 'Camiseta Básica' })
  name: string;

  @ApiProperty({ example: 'Nike', required: false })
  brand?: string;

  @ApiProperty({ example: 'M', required: false })
  size?: string;

  @ApiProperty({ example: 'Azul', required: false })
  color?: string;

  @ApiProperty({ example: 'em_estoque' })
  status: string;

  @ApiProperty({ example: 79.9 })
  price: number;

  @ApiProperty({ example: 1 })
  categoryId: number;
}

export class PaginatedItemsResponseDto {
  @ApiProperty({ type: [ItemResponseDto] })
  items: ItemResponseDto[];

  @ApiProperty({ example: 509 })
  nextCursor: number | null;
}
