import { Product } from "./product";

export class User {
    id: string;
    picture: string;
    name: string;
    email: string;
    password: string;
    role: string;
    favs: string;

    constructor(i: string, pi: string, na: string, e: string, p: string, r: string, f: string) {
        this.id = i;
        this.picture = pi;
        this.name = na;
        this.email = e;
        this.password = p;
        this.role = r;
        this.favs = f;
    }
}