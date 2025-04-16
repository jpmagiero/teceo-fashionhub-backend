import { Module } from '@nestjs/common';
import { ItemController } from './presentation/controllers/item.controller';
import { CreateItemUseCase } from './application/use-cases/create-item.use-case';
import { PrismaItemRepository } from './infrastructure/prisma/prisma-item.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemRepository } from './domain/repositories/item.repository';

@Module({
  controllers: [ItemController],
  providers: [
    CreateItemUseCase,
    PrismaItemRepository,
    PrismaService,
    {
      provide: ItemRepository,
      useClass: PrismaItemRepository,
    },
  ],
})
export class ItemModule {}
