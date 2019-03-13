import { Market } from "./market";

export class Category {
    id: number;
    name: string;
    message: string;
    market: Market;

    constructor(i: number, n: string, m: string, ma: Market){
        this.id = i;
        this.name = n;
        this.message = m;
        this.market = ma;
    }
}