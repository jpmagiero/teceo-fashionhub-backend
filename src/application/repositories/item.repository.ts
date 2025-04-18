import { Item } from '../entities/item.entity';

export abstract class ItemRepository {
  abstract create(item: Item): Promise<Item>;
  abstract findManyPaginated(
    take: number,
    cursor?: number,
  ): Promise<{ items: Item[]; nextCursor: number | null }>;
}
