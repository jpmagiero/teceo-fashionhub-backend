import { Item } from '../entities/item.entity';

export abstract class ItemRepository {
  abstract create(item: Item): Promise<Item>;
}
