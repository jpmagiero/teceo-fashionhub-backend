import { CreateCategoryUseCase } from '../../application/use-cases/category/create-category.use-case';
import { GetCategoriesUseCase } from '../../application/use-cases/category/get-categories.use-case';
import { CategoryRepository } from '../../application/repositories/category.repository';
import { CreateCategoryDto } from '../../application/dtos/category/create-category.dto';
import { Category } from '../../application/entities/category.entity';

function createMockCategoryRepository(): jest.Mocked<CategoryRepository> {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
  };
}

describe('Category Use Cases', () => {
  describe('CreateCategoryUseCase', () => {
    let useCase: CreateCategoryUseCase;
    let repo: jest.Mocked<CategoryRepository>;

    beforeEach(() => {
      repo = createMockCategoryRepository();
      useCase = new CreateCategoryUseCase(repo);
    });

    it('should create a category successfully', async () => {
      const dto: CreateCategoryDto = { name: 'Clothes' };
      const mockCategory: Category = { id: 1, name: 'Clothes' };
      repo.create.mockResolvedValue(mockCategory);

      const result = await useCase.execute(dto);

      expect(result.name).toBe('Clothes');
      expect(result.id).toBe(1);
    });
  });

  describe('GetCategoriesUseCase', () => {
    let useCase: GetCategoriesUseCase;
    let repo: jest.Mocked<CategoryRepository>;

    beforeEach(() => {
      repo = createMockCategoryRepository();
      useCase = new GetCategoriesUseCase(repo);
    });

    it('should return categories', async () => {
      const mockCategories: Category[] = [
        { id: 1, name: 'Clothes' },
        { id: 2, name: 'Accessories' },
      ];
      repo.findAll.mockResolvedValue(mockCategories);

      const result = await useCase.execute();

      expect(result.length).toBe(2);
      expect(result[0].name).toBe('Clothes');
      expect(result[1].name).toBe('Accessories');
    });
  });
});
