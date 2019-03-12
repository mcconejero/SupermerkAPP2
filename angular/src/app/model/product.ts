export class Product {
    title: string;
    autor: string;
    anyo: number;
    content: string;
    typeId: number;
    categoryId: number;

    constructor(t: string, au: string, an: number, c: string, tI: number, cI: number) {
        this.title = t;
        this.autor = au;
        this.anyo = an;
        this.content = c;
        this.typeId = tI;
        this.categoryId = cI;
    }
}

