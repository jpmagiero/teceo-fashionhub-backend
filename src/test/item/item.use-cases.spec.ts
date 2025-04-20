import { CreateItemUseCase } from '../../application/use-cases/item/create-item.use-case';
import { GetItemsUseCase } from '../../application/use-cases/item/get-items.use-case';
import { UpdateItemUseCase } from '../../application/use-cases/item/update-item.use-case';
import { BulkUpdateStatusUseCase } from '../../application/use-cases/item/bulk-update-status.use-case';
import { ItemRepository } from '../../application/repositories/item.repository';
import { CategoryRepository } from '../../application/repositories/category.repository';
import { CreateItemDto } from '../../application/dtos/item/create-item.dto';
import { UpdateItemDto } from '../../application/dtos/item/update-item.dto';
import { ItemStatus } from '../../application/dtos/item/item-status.enum';
import { Item } from '../../application/entities/item.entity';

function createMockItemRepository(): jest.Mocked<ItemRepository> {
  return {
    create: jest.fn(),
    findManyPaginated: jest.fn(),
    update: jest.fn(),
    bulkUpdateStatus: jest.fn(),
  };
}

function createMockCategoryRepository(): jest.Mocked<CategoryRepository> {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
  };
}

describe('Item Use Cases', () => {
  describe('CreateItemUseCase', () => {
    let useCase: CreateItemUseCase;
    let repo: jest.Mocked<ItemRepository>;

    beforeEach(() => {
      repo = createMockItemRepository();
      useCase = new CreateItemUseCase(repo);
    });

    it('should create an item successfully', async () => {
      const dto: CreateItemDto = {
        name: 'T-shirt',
        status: ItemStatus.IN_STOCK,
        price: 100,
        categoryId: 1,
      };
      const mockItem: Item = { ...dto, id: 1 } as Item;
      repo.create.mockResolvedValue(mockItem);

      const result = await useCase.execute(dto);

      expect(result.name).toBe('T-shirt');
      expect(result.status).toBe(ItemStatus.IN_STOCK);
      expect(result.id).toBe(1);
    });
  });

  describe('GetItemsUseCase', () => {
    let useCase: GetItemsUseCase;
    let repo: jest.Mocked<ItemRepository>;

    beforeEach(() => {
      repo = createMockItemRepository();
      useCase = new GetItemsUseCase(repo);
    });

    it('should return paginated items', async () => {
      const mockItem: Item = { id: 1, name: 'T-shirt' } as Item;
      repo.findManyPaginated.mockResolvedValue({
        items: [mockItem],
        nextCursor: 2,
      });

      const result = await useCase.execute(10, undefined);

      expect(result.items.length).toBe(1);
      expect(result.nextCursor).toBe(2);
    });
  });

  describe('UpdateItemUseCase', () => {
    let useCase: UpdateItemUseCase;
    let itemRepo: jest.Mocked<ItemRepository>;
    let categoryRepo: jest.Mocked<CategoryRepository>;

    beforeEach(() => {
      itemRepo = createMockItemRepository();
      categoryRepo = createMockCategoryRepository();
      useCase = new UpdateItemUseCase(itemRepo, categoryRepo);
    });

    it('should update an item successfully', async () => {
      const mockCategory = { id: 1, name: 'Clothes' };
      const mockItem: Item = { id: 1, name: 'Updated T-shirt' } as Item;
      categoryRepo.findById.mockResolvedValue(mockCategory);
      itemRepo.update.mockResolvedValue(mockItem);

      const dto: UpdateItemDto = { name: 'Updated T-shirt', categoryId: 1 };
      const result = await useCase.execute(1, dto);

      expect(result.name).toBe('Updated T-shirt');
      expect(result.id).toBe(1);
    });
  });

  describe('BulkUpdateStatusUseCase', () => {
    let useCase: BulkUpdateStatusUseCase;
    let repo: jest.Mocked<ItemRepository>;

    beforeEach(() => {
      repo = createMockItemRepository();
      useCase = new BulkUpdateStatusUseCase(repo);
    });

    it('should update status in bulk', async () => {
      const mockItems: Item[] = [
        { id: 1, status: 'in_stock' } as Item,
        { id: 2, status: 'in_stock' } as Item,
      ];
      repo.bulkUpdateStatus.mockResolvedValue(mockItems);

      const result = await useCase.execute([1, 2], 'in_stock');

      expect(result.length).toBe(2);
      expect(result[0].status).toBe('in_stock');
    });
  });
});
