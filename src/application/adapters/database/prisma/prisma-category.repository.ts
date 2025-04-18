import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CategoryRepository } from '../../../repositories/category.repository';
import { Category } from '../../../entities/category.entity';

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(category: Category): Promise<Category> {
    const created = await this.prisma.category.create({
      data: { name: category.name },
    });
    return new Category(created.name, created.id);
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();
    return categories.map((c) => new Category(c.name, c.id));
  }

  async findById(id: number): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    return category ? new Category(category.name, category.id) : null;
  }
}
