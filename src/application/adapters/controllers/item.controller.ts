import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateItemUseCase } from '../../use-cases/create-item.use-case';
import { CreateItemDto } from '../../dtos/item/create-item.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { GetItemsQueryDto } from 'src/application/dtos/item/get-items-query.dto';
import { GetItemsUseCase } from '../../use-cases/get-items.use-case';
import { PaginatedItemsResponseDto } from 'src/application/dtos/item/item-response.dto';

@Controller('items')
export class ItemController {
  constructor(
    private readonly createItemUseCase: CreateItemUseCase,
    private readonly getItemsUseCase: GetItemsUseCase,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Lista paginada de itens',
    type: PaginatedItemsResponseDto,
  })
  async findAll(@Query() query: GetItemsQueryDto) {
    const take = query.take ?? 20;
    const cursor = query.cursor;
    return await this.getItemsUseCase.execute(take, cursor);
  }

  @Post()
  @ApiBody({ type: [CreateItemDto] })
  async create(@Body() dtos: CreateItemDto[]) {
    return Promise.all(dtos.map((dto) => this.createItemUseCase.execute(dto)));
  }
}
