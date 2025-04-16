export class Item {
  constructor(
    public name: string,
    public status: string,
    public price: number,
    public categoryId: number,
    public brand?: string | null,
    public size?: string | null,
    public color?: string | null,
    public id?: number,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
