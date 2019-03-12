import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse } from '../interfaces/login-response';
import { Observable } from 'rxjs';
import { LoginDto } from '../dto/login.dto';
import { environment } from 'src/environments/environment.prod';
import { DataResponse } from '../interfaces/data-response';

const authUrl = `${environment.apiUrl}/`;

const requestOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<LoginResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ` + btoa(`${loginDto.email}:${loginDto.password}`),
        'Access-Control-Allow-Origin': '*'
      })
    };
    class Metakey {
      access_token: String;

      constructor(access_token: String) {
        this.access_token = access_token;
      }
    }
    const metaKey = new Metakey('gzPG0eTCB0DG697U9ud6Oj9wTK1ZvZch');
    return this.http.post<LoginResponse>(`${authUrl}auth`, metaKey, requestOptions);
  }

  setLoginData(loginResponse: LoginResponse) {
    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('email', loginResponse.user.name);
    localStorage.setItem('name', loginResponse.user.email);
    localStorage.setItem('role', loginResponse.user.role);
    localStorage.setItem('picture', loginResponse.user.picture);
    localStorage.setItem('favs', loginResponse.user.favs);
  }

  getLoginData() : DataResponse{
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    return {name : name , email : email};
  }

  getToken(): String {
    return localStorage.getItem('token');
  }

  removeLoginData() {
    localStorage.clear();
  }

}
