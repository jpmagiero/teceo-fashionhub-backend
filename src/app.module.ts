import { Module } from '@nestjs/common';
import { ItemController } from './application/adapters/controllers/item.controller';
import { CategoryController } from './application/adapters/controllers/category.controller';
import { CreateItemUseCase } from './application/use-cases/item/create-item.use-case';
import { CreateCategoryUseCase } from './application/use-cases/category/create-category.use-case';
import { PrismaItemRepository } from './application/adapters/database/prisma/prisma-item.repository';
import { PrismaCategoryRepository } from './application/adapters/database/prisma/prisma-category.repository';
import { PrismaService } from './application/adapters/database/prisma/prisma.service';
import { ItemRepository } from './application/repositories/item.repository';
import { CategoryRepository } from './application/repositories/category.repository';
import { GetCategoriesUseCase } from './application/use-cases/category/get-categories.use-case';
import { GetItemsUseCase } from './application/use-cases/item/get-items.use-case';
import { UpdateItemUseCase } from './application/use-cases/item/update-item.use-case';
import { BulkUpdateStatusUseCase } from './application/use-cases/item/bulk-update-status.use-case';

@Module({
  imports: [],
  controllers: [ItemController, CategoryController],
  providers: [
    CreateItemUseCase,
    GetItemsUseCase,
    CreateCategoryUseCase,
    GetCategoriesUseCase,
    UpdateItemUseCase,
    BulkUpdateStatusUseCase,
    PrismaItemRepository,
    PrismaCategoryRepository,
    PrismaService,
    { provide: ItemRepository, useClass: PrismaItemRepository },
    { provide: CategoryRepository, useClass: PrismaCategoryRepository },
  ],
})
export class AppModule {}
