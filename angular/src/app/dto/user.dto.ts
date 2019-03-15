export class UserDto {
    name: string;
    email: string;
    password: string;
    role: string;
  
    constructor(n: string, e: string, p: string) {
      this.name = n;
      this.email = e;
      this.password = p;
      this.role = 'admin';
    }
  }