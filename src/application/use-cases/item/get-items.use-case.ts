import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../../repositories/item.repository';
import { Item } from '../../entities/item.entity';

@Injectable()
export class GetItemsUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(
    take: number,
    cursor?: number,
  ): Promise<{ items: Item[]; nextCursor: number | null }> {
    return this.itemRepository.findManyPaginated(take, cursor);
  }
}
