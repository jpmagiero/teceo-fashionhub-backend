import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateItemUseCase } from '../../use-cases/item/create-item.use-case';
import { CreateItemDto } from '../../dtos/item/create-item.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { GetItemsQueryDto } from 'src/application/dtos/item/get-items-query.dto';
import { GetItemsUseCase } from '../../use-cases/item/get-items.use-case';
import {
  ItemResponseDto,
  PaginatedItemsResponseDto,
} from 'src/application/dtos/item/item-response.dto';
import { UpdateItemDto } from 'src/application/dtos/item/update-item.dto';
import { BulkUpdateStatusDto } from 'src/application/dtos/item/bulk-update-status.dto';
import { UpdateItemUseCase } from '../../use-cases/item/update-item.use-case';
import { BulkUpdateStatusUseCase } from '../../use-cases/item/bulk-update-status.use-case';

@Controller('items')
export class ItemController {
  constructor(
    private readonly createItemUseCase: CreateItemUseCase,
    private readonly getItemsUseCase: GetItemsUseCase,
    private readonly updateItemUseCase: UpdateItemUseCase,
    private readonly bulkUpdateStatusUseCase: BulkUpdateStatusUseCase,
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
  async create(@Body() dtos: CreateItemDto[]): Promise<ItemResponseDto[]> {
    return Promise.all(dtos.map((dto) => this.createItemUseCase.execute(dto)));
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Item atualizado com sucesso' })
  async update(@Param('id') id: number, @Body() dto: UpdateItemDto) {
    return await this.updateItemUseCase.execute(id, dto);
  }

  @Patch('bulk/status')
  @ApiOkResponse({ description: 'Status dos itens atualizados com sucesso' })
  async bulkUpdateStatus(@Body() dto: BulkUpdateStatusDto) {
    return await this.bulkUpdateStatusUseCase.execute(dto.ids, dto.status);
  }
}
