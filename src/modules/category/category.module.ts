import { Module } from '@nestjs/common';
import { CategoryController } from './presentation/controllers/category.controller';
import { CreateCategoryUseCase } from './application/use-cases/create-category.use-case';
import { PrismaCategoryRepository } from './infrastructure/prisma/prisma-category.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryRepository } from './domain/repositories/category.repository';

@Module({
  controllers: [CategoryController],
  providers: [
    CreateCategoryUseCase,
    PrismaCategoryRepository,
    PrismaService,
    {
      provide: CategoryRepository,
      useClass: PrismaCategoryRepository,
    },
  ],
})
export class CategoryModule {}
