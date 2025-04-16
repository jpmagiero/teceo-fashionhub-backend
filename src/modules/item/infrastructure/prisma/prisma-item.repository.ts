import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemRepository } from '../../domain/repositories/item.repository';
import { Item } from '../../domain/entities/item.entity';

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
  catch(error) {
    throw error;
  }
}
