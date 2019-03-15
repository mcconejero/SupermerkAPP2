export class MarketDto {
    name: string;
    latlong: string

    constructor(n: string, l: string){
        this.name = n;
        this.latlong = l;
    }
}