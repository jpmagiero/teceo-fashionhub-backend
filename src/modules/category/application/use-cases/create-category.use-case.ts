import { Injectable, BadRequestException } from '@nestjs/common';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { Category } from '../../domain/entities/category.entity';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(data: { name: string }): Promise<Category> {
    try {
      const category = new Category(data.name);
      return await this.categoryRepository.create(category);
    } catch (error) {
      throw new BadRequestException(
        'Erro ao criar categoria: ' + (error as Error).message,
      );
    }
  }
}
