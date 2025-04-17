import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryUseCase } from '../../application/use-cases/create-category.use-case';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('categories')
export class CategoryController {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  @Post()
  @ApiBody({ type: [CreateCategoryDto] })
  async create(@Body() dtos: CreateCategoryDto[]) {
    return Promise.all(
      dtos.map((dto) => this.createCategoryUseCase.execute(dto)),
    );
  }
}
