export class CategoryDto {
  name: string;
  message: string;
  marketId: string;

  constructor(n: string, m: string, ma: string) {
    this.name = n;
    this.message = m;
    this.marketId = ma;
  }
}
