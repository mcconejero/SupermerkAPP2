export class Product {
    name: string;
    categoryId: string;
    marketId: string;

    constructor(n: string, cI: string, mI: string) {
        this.name = n;
        this.categoryId = cI;
        this.marketId = mI;
    }
}

