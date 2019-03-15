import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListApiResponse } from "../interfaces/listApi";
import { User } from "../interfaces/login-response";
import { environment } from "src/environments/environment.prod";
import { UserDto } from "../dto/user.dto";

const userUrl = `${environment.apiUrl}/users`;

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
constructor(private http: HttpClient, private loginService: LoginService) { }

  getAllUsers(): Observable<ListApiResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get<ListApiResponse>(`${userUrl}`, requestOptions);
   }

  deleteUser(id: string): Observable<User[]> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.delete<User[]>(`${userUrl}/${id}`, requestOptions);
  }

}