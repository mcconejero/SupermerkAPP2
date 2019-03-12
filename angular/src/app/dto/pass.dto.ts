export class ContraseniaUsuario {
    password: string;
    newpassword: string;

    constructor(p: string, np: string) {
        this.password = p;
        this.newpassword = np;
    }
}