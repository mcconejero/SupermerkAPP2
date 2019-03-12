import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { LoginService } from './login.service';
import { User } from '../model/user';
import { UsuarioCreateResponse } from '../interfaces/user-response';
import { UsuarioEditado } from '../dto/edit-user.dto';

const usuariosUrl = `${environment.apiUrl}/user`;

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
constructor(private http: HttpClient, private loginService: LoginService) { }

  getAllUsuarios(): Observable<User[]> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get<User[]>(`${usuariosUrl}/all`, requestOptions);
   }

  createUsuarios(usuarioCreate: User): Observable<UsuarioCreateResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post<UsuarioCreateResponse>(`${usuariosUrl}/create`, usuarioCreate, requestOptions);
  }

  editUsuarios(usuarioEditadoDto: UsuarioEditado, id: number): Observable<UsuarioCreateResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.put<UsuarioCreateResponse>(`${usuariosUrl}/${id}`, usuarioEditadoDto, requestOptions);
}

  deleteUsuarios(id: number): Observable<User[]>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.delete<User[]>(`${usuariosUrl}/${id}`, requestOptions);
}

}