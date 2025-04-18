import { Injectable, BadRequestException } from '@nestjs/common';
import { ItemRepository } from '../repositories/item.repository';
import { Item } from '../entities/item.entity';
import { Prisma } from '@prisma/client';
import { ItemResponseDto } from '../dtos/item/item-response.dto';
import { plainToInstance } from 'class-transformer';
import { CreateItemDto } from '../dtos/item/create-item.dto';

@Injectable()
export class CreateItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(data: CreateItemDto): Promise<ItemResponseDto> {
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
      const createdItem = await this.itemRepository.create(item);
      return plainToInstance(ItemResponseDto, createdItem);
    } catch (error) {
      console.error('Erro ao criar item:', error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException(
          'Categoria não encontrada para o categoryId informado.',
        );
      }
      throw new BadRequestException(
        `Erro ao criar item '${data.name}': ${(error as Error).message}`,
      );
    }
  }
}
