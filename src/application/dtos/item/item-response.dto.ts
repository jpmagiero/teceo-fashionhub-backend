import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ItemResponseDto {
  @Expose()
  @ApiProperty({ example: 508 })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Basic T-shirt' })
  name: string;

  @Expose()
  @ApiProperty({ example: 'Nike', required: false })
  brand?: string;

  @Expose()
  @ApiProperty({ example: 'M', required: false })
  size?: string;

  @Expose()
  @ApiProperty({ example: 'Blue', required: false })
  color?: string;

  @Expose()
  @ApiProperty({ example: 'in_stock' })
  status: string;

  @Expose()
  @ApiProperty({ example: 79.9 })
  price: number;

  @Expose()
  @ApiProperty({ example: 'Clothes' })
  category: string;
}

export class PaginatedItemsResponseDto {
  @ApiProperty({ type: [ItemResponseDto] })
  items: ItemResponseDto[];

  @ApiProperty({ example: 509 })
  nextCursor: number | null;
}
