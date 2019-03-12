export class UsuarioEditado {
    name: string;
    email: string;
    phone: string;
    notes: string;
    role: string;

    constructor(na: string, e: string, p: string, n: string, r: string) {
        this.name = na;
        this.email = e;
        this.phone = p;
        this.notes = n;
        this.role = r;
    }
}