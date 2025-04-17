import { Injectable, BadRequestException } from '@nestjs/common';
import { ItemRepository } from '../repositories/item.repository';
import { Item } from '../entities/item.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class CreateItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(
    data: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Item> {
    try {
      const item = new Item(
        data.name,
        data.status,
        data.price,
        data.categoryId,
        data.brand,
        data.size,
        data.color,
      );
      return await this.itemRepository.create(item);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException(
          'Categoria não encontrada para o categoryId informado.',
        );
      }
      throw new BadRequestException(
        'Erro ao criar item: ' + (error as Error).message,
      );
    }
  }
}
