export class User {
    id: string;
    name: string;
    email: string;
    phone: string;
    notes: string;
    role: string;

    constructor(i: string, na: string, e: string, p: string, n: string, r: string) {
        this.id = i;
        this.name = na;
        this.email = e;
        this.phone = p;
        this.notes = n;
        this.role = r;
    }
}