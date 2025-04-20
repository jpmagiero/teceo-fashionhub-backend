import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  ValidationPipe,
  Type,
} from '@nestjs/common';

@Injectable()
export class ValidateArrayPipe<T>
  implements PipeTransform<unknown, Promise<T[]>>
{
  private readonly validationPipe: ValidationPipe;

  constructor(private readonly metatype: Type<T>) {
    this.validationPipe = new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.flatMap((error) =>
          Object.values(error.constraints || {}),
        );
        return new BadRequestException(messages);
      },
    });
  }

  async transform(value: unknown, metadata: ArgumentMetadata): Promise<T[]> {
    if (!Array.isArray(value)) {
      throw new BadRequestException('Expected an array');
    }

    const validatedItems: T[] = [];

    for (const item of value) {
      try {
        const validated = (await this.validationPipe.transform(item, {
          ...metadata,
          metatype: this.metatype,
        })) as T;

        validatedItems.push(validated);
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw error;
        }
        throw new BadRequestException(
          `Validation failed: ${(error as Error).message}`,
        );
      }
    }

    return validatedItems;
  }
}
