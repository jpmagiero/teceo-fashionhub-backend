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
          'Categoria não encontrada para o categoryId informado.',
        );
      }
    }

    try {
      const updated = await this.itemRepository.update(id, dto);
      if (!updated) {
        throw new NotFoundException('Item não encontrado');
      }
      return plainToInstance(ItemResponseDto, updated);
    } catch (error) {
      throw new BadRequestException(
        `Erro ao atualizar item: ${(error as Error).message}`,
      );
    }
  }
}
