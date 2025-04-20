import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../../repositories/item.repository';

@Injectable()
export class GetItemsUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(
    take: number,
    cursor?: number,
  ): Promise<{ items: any[]; nextCursor: number | null }> {
    const result = await this.itemRepository.findManyPaginated(take, cursor);

    return {
      items: result.items.map((item) => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        size: item.size,
        color: item.color,
        status: item.status,
        price: item.price,
        category: item.category?.name || '',
      })),
      nextCursor: result.nextCursor,
    };
  }
}
