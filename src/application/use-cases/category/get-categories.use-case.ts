import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../repositories/category.repository';
import { plainToInstance } from 'class-transformer';
import { CategoryResponseDto } from '../../dtos/category/category-response.dto';

@Injectable()
export class GetCategoriesUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryRepository.findAll();
    return categories.map((cat) => plainToInstance(CategoryResponseDto, cat));
  }
}
