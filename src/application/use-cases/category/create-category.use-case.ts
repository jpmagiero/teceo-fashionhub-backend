import { Injectable, BadRequestException } from '@nestjs/common';
import { CategoryRepository } from '../../repositories/category.repository';
import { Category } from '../../entities/category.entity';
import { plainToInstance } from 'class-transformer';
import { CategoryResponseDto } from '../../dtos/category/category-response.dto';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(data: { name: string }): Promise<CategoryResponseDto> {
    try {
      const category = new Category(data.name);
      const createdCategory = await this.categoryRepository.create(category);
      return plainToInstance(CategoryResponseDto, createdCategory);
    } catch (error) {
      throw new BadRequestException(
        'Erro ao criar categoria: ' + (error as Error).message,
      );
    }
  }
}
