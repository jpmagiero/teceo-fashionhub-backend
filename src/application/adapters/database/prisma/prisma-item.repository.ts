import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ItemRepository } from '../../../repositories/item.repository';
import { Item } from '../../../entities/item.entity';
import { Prisma } from '@prisma/client';
import { UpdateItemDto } from 'src/application/dtos/item/update-item.dto';

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

  async update(id: number, dto: UpdateItemDto): Promise<Item> {
    const updated = await this.prisma.item.update({
      where: { id },
      data: dto,
    });
    return new Item(
      updated.name,
      updated.status,
      updated.price,
      updated.categoryId,
      updated.brand,
      updated.size,
      updated.color,
      updated.id,
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async bulkUpdateStatus(ids: number[], status: string): Promise<Item[]> {
    await this.prisma.item.updateMany({
      where: { id: { in: ids } },
      data: { status },
    });
    const updatedItems = await this.prisma.item.findMany({
      where: { id: { in: ids } },
      orderBy: { id: 'asc' },
    });
    return updatedItems.map(
      (item) =>
        new Item(
          item.name,
          item.status,
          item.price,
          item.categoryId,
          item.brand,
          item.size,
          item.color,
          item.id,
          item.createdAt,
          item.updatedAt,
        ),
    );
  }
}
