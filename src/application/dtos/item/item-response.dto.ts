import { ApiProperty } from '@nestjs/swagger';

export class ItemResponseDto {
  @ApiProperty({ example: 508 })
  id: number;

  @ApiProperty({ example: 'Basic T-shirt' })
  name: string;

  @ApiProperty({ example: 'Nike', required: false })
  brand?: string;

  @ApiProperty({ example: 'M', required: false })
  size?: string;

  @ApiProperty({ example: 'Blue', required: false })
  color?: string;

  @ApiProperty({ example: 'in_stock' })
  status: string;

  @ApiProperty({ example: 79.9 })
  price: number;

  @ApiProperty({ example: 'Clothes' })
  category: string;
}

export class PaginatedItemsResponseDto {
  @ApiProperty({ type: [ItemResponseDto] })
  items: ItemResponseDto[];

  @ApiProperty({ example: 509 })
  nextCursor: number | null;
}
