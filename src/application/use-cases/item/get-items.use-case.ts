import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../../repositories/item.repository';
import { ItemResponseDto } from '../../dtos/item/item-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GetItemsUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(
    take: number,
    cursor?: number,
  ): Promise<{ items: ItemResponseDto[]; nextCursor: number | null }> {
    const result = await this.itemRepository.findManyPaginated(take, cursor);

    return {
      items: result.items.map((item) =>
        plainToInstance(
          ItemResponseDto,
          {
            ...item,
            category: item.category?.name || '',
          },
          { excludeExtraneousValues: true },
        ),
      ),
      nextCursor: result.nextCursor,
    };
  }
}
