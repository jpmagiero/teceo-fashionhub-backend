import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCategoryUseCase } from '../../use-cases/category/create-category.use-case';
import { GetCategoriesUseCase } from '../../use-cases/category/get-categories.use-case';
import { CreateCategoryDto } from '../../dtos/category/create-category.dto';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CategoryResponseDto } from 'src/application/dtos/category/category-response.dto';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getCategoriesUseCase: GetCategoriesUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Categories created successfully',
    type: [CategoryResponseDto],
    schema: {
      example: [
        { id: 1, name: 'Clothes' },
        { id: 2, name: 'Accessories' },
      ],
    },
  })
  async create(
    @Body() dtos: CreateCategoryDto[],
  ): Promise<CategoryResponseDto[]> {
    return Promise.all(
      dtos.map((dto) => this.createCategoryUseCase.execute(dto)),
    );
  }

  @Get()
  @ApiOkResponse({
    description: 'List of categories',
    type: [CategoryResponseDto],
    schema: {
      example: [
        { id: 1, name: 'Clothes' },
        { id: 2, name: 'Accessories' },
      ],
    },
  })
  async findAll(): Promise<CategoryResponseDto[]> {
    return this.getCategoriesUseCase.execute();
  }
}
