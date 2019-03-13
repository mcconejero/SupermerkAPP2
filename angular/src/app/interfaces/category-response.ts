import { Market } from "../model/market";

export interface Category {
    id: number;
    name: string;
    message: string;
    market: Market;
}