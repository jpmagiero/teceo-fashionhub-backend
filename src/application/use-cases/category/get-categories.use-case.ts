import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../repositories/category.repository';
import { Category } from '../../entities/category.entity';

@Injectable()
export class GetCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}
