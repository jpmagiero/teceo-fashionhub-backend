import { Body, Controller, Post } from '@nestjs/common';
import { CreateItemUseCase } from '../../application/use-cases/create-item.use-case';
import { CreateItemDto } from '../dtos/create-item.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('items')
export class ItemController {
  constructor(private readonly createItemUseCase: CreateItemUseCase) {}

  @Post()
  @ApiBody({ type: [CreateItemDto] })
  async create(@Body() dtos: CreateItemDto[]) {
    return Promise.all(dtos.map((dto) => this.createItemUseCase.execute(dto)));
  }
}
