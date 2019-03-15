export class UsuarioEditado {
    name: string;
    email: string;
    role: string;

    constructor(na: string, e: string, r: string) {
        this.name = na;
        this.email = e;
        this.role = r;
    }
}