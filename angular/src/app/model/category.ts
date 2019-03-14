import { Market } from "./market";

export class Category {
    id: number;
    name: string;
    message: string;
    marketId: string;

    constructor(i: number, n: string, m: string, ma: string){
        this.id = i;
        this.name = n;
        this.message = m;
        this.marketId = ma;
    }
}