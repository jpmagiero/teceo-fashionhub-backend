import { Body, Controller, Post } from '@nestjs/common';
import { CreateItemUseCase } from '../../application/use-cases/create-item.use-case';
import { CreateItemDto } from '../dtos/create-item.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly createItemUseCase: CreateItemUseCase) {}

  @Post()
  async create(@Body() dto: CreateItemDto) {
    return this.createItemUseCase.execute(dto);
  }
}
