import { UpdateItemDto } from '../dtos/item/update-item.dto';
import { Item } from '../entities/item.entity';

export abstract class ItemRepository {
  abstract create(item: Item): Promise<Item>;
  abstract findManyPaginated(
    take: number,
    cursor?: number,
  ): Promise<{ items: Item[]; nextCursor: number | null }>;
  abstract update(id: number, dto: UpdateItemDto): Promise<Item>;
  abstract bulkUpdateStatus(ids: number[], status: string): Promise<Item[]>;
}
