import { Module } from '@nestjs/common';
import { ItemModule } from './modules/item/item.module';
import { CategoryModule } from './modules/category/category.module';
@Module({
  imports: [ItemModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
