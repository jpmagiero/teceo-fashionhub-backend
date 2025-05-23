import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ItemRepository } from '../../repositories/item.repository';
import { ItemResponseDto } from '../../dtos/item/item-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BulkUpdateStatusUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(ids: number[], status: string): Promise<ItemResponseDto[]> {
    try {
      const updatedItems = await this.itemRepository.bulkUpdateStatus(
        ids,
        status,
      );
      if (!updatedItems.length) {
        throw new NotFoundException('No items found for the provided ids.');
      }
      return updatedItems.map((item) => plainToInstance(ItemResponseDto, item));
    } catch (error) {
      throw new BadRequestException(
        `Error updating status in bulk: ${(error as Error).message}`,
      );
    }
  }
}
