import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  ItemRepository,
  ItemWithCategory,
} from '../../../repositories/item.repository';
import { Item } from '../../../entities/item.entity';
import { Prisma } from '@prisma/client';
import { UpdateItemDto } from 'src/application/dtos/item/update-item.dto';

interface PrismaItemWithCategory {
  id: number;
  name: string;
  brand: string | null;
  size: string | null;
  color: string | null;
  status: string;
  price: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  category?: { id: number; name: string };
}

@Injectable()
export class PrismaItemRepository implements ItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapToEntity(data: Omit<PrismaItemWithCategory, 'category'>): Item {
    return new Item(
      data.name,
      data.status,
      data.price,
      data.categoryId,
      data.brand,
      data.size,
      data.color,
      data.id,
      data.createdAt,
      data.updatedAt,
    );
  }

  private toItemWithCategory(
    prismaItem: PrismaItemWithCategory,
  ): ItemWithCategory {
    return {
      id: prismaItem.id,
      name: prismaItem.name,
      brand: prismaItem.brand,
      size: prismaItem.size,
      color: prismaItem.color,
      status: prismaItem.status,
      price: prismaItem.price,
      categoryId: prismaItem.categoryId,
      createdAt: prismaItem.createdAt,
      updatedAt: prismaItem.updatedAt,
      category: prismaItem.category
        ? { id: prismaItem.category.id, name: prismaItem.category.name }
        : undefined,
    } as ItemWithCategory;
  }

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
    return this.mapToEntity(created);
  }

  async findManyPaginated(
    take: number,
    cursor?: number,
  ): Promise<{ items: ItemWithCategory[]; nextCursor: number | null }> {
    try {
      const query: Prisma.ItemFindManyArgs = {
        take,
        orderBy: { id: 'asc' },
        include: { category: true },
      };

      if (cursor) {
        query.cursor = { id: cursor };
        query.skip = 1;
      }

      const items = (await this.prisma.item.findMany(
        query,
      )) as PrismaItemWithCategory[];
      const nextCursor =
        items.length === take ? items[items.length - 1].id : null;

      return {
        items: items.map((item) => this.toItemWithCategory(item)),
        nextCursor,
      };
    } catch (error) {
      console.error('Error fetching paginated items:', error);
      throw error;
    }
  }

  async update(id: number, dto: UpdateItemDto): Promise<Item> {
    try {
      const updated = await this.prisma.item.update({
        where: { id },
        data: dto,
      });
      return this.mapToEntity(updated);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new Error(`Item with ID ${id} not found`);
      }
      throw error;
    }
  }

  async bulkUpdateStatus(ids: number[], status: string): Promise<Item[]> {
    try {
      await this.prisma.item.updateMany({
        where: { id: { in: ids } },
        data: { status },
      });

      const updatedItems = await this.prisma.item.findMany({
        where: { id: { in: ids } },
        orderBy: { id: 'asc' },
      });

      return updatedItems.map((item) => this.mapToEntity(item));
    } catch (error) {
      console.error('Error updating status in bulk:', error);
      throw error;
    }
  }
}
