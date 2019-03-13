export class Market {
    id: number;
    name: string;
    latlong: string;

    constructor(i: number, n: string, l: string){
        this.id = i;
        this.name = n;
        this.latlong = l;
    }
}