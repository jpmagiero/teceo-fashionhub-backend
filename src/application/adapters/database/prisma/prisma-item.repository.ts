import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ItemRepository } from '../../../repositories/item.repository';
import { Item } from '../../../entities/item.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaItemRepository implements ItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(item: Item): Promise<Item> {
    const created = await this.prisma.item.create({
      data: {
        name: item.name,
        brand: item.brand,
        size: item.size,
        color: item.color,
        status: item.status,
        price: item.price,
        categoryId: item.categoryId,
      },
    });
    return new Item(
      created.name,
      created.status,
      created.price,
      created.categoryId,
      created.brand,
      created.size,
      created.color,
      created.id,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findManyPaginated(
    take: number,
    cursor?: number,
  ): Promise<{ items: Item[]; nextCursor: number | null }> {
    const query: Prisma.ItemFindManyArgs = {
      take,
      orderBy: { id: 'asc' },
    };
    if (cursor) {
      query.cursor = { id: cursor };
      query.skip = 1;
    }
    const items = await this.prisma.item.findMany(query);
    const nextCursor =
      items.length === take ? items[items.length - 1].id : null;
    return {
      items: items.map(
        (i) =>
          new Item(
            i.name,
            i.status,
            i.price,
            i.categoryId,
            i.brand,
            i.size,
            i.color,
            i.id,
            i.createdAt,
            i.updatedAt,
          ),
      ),
      nextCursor,
    };
  }

  catch(error) {
    throw error;
  }
}
