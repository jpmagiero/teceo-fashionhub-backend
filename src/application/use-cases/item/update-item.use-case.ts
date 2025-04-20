import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ItemRepository } from '../../repositories/item.repository';
import { CategoryRepository } from '../../repositories/category.repository';
import { UpdateItemDto } from '../../dtos/item/update-item.dto';
import { ItemResponseDto } from '../../dtos/item/item-response.dto';
import { plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';

@Injectable()
export class UpdateItemUseCase {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(id: number, dto: UpdateItemDto): Promise<ItemResponseDto> {
    if (dto.categoryId !== undefined && dto.categoryId !== null) {
      const category = await this.categoryRepository.findById(dto.categoryId);
      if (!category) {
        throw new BadRequestException(
          'Category not found for the provided categoryId.',
        );
      }
    }

    try {
      const updated = await this.itemRepository.update(id, dto);
      if (!updated) {
        throw new NotFoundException('Item not found');
      }
      return plainToInstance(ItemResponseDto, updated);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Item not found');
      }
      throw new BadRequestException(
        `Error updating item: ${(error as Error).message}`,
      );
    }
  }
}
