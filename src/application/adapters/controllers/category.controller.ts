import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCategoryUseCase } from '../../use-cases/create-category.use-case';
import { GetCategoriesUseCase } from '../../use-cases/get-categories.use-case';
import { CreateCategoryDto } from '../../dtos/category/create-category.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { CategoryDto } from 'src/application/dtos/category/category-response.dto';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getCategoriesUseCase: GetCategoriesUseCase,
  ) {}

  @Post()
  async create(@Body() dtos: CreateCategoryDto[]) {
    return Promise.all(
      dtos.map((dto) => this.createCategoryUseCase.execute(dto)),
    );
  }

  @Get()
  @ApiOkResponse({
    description: 'Lista de categorias',
    type: [CategoryDto],
    schema: {
      example: [
        { id: 1, name: 'Roupas' },
        { id: 2, name: 'Acessórios' },
      ],
    },
  })
  async findAll() {
    return this.getCategoriesUseCase.execute();
  }
}
