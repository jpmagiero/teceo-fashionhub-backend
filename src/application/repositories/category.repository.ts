import { Category } from '../entities/category.entity';

export abstract class CategoryRepository {
  abstract create(category: Category): Promise<Category>;
  abstract findAll(): Promise<Category[]>;
  abstract findById(id: number): Promise<Category | null>;
}
