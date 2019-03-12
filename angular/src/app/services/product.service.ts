import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../model/product';
import { LoginService } from './login.service';
import { RecursoCreateResponse } from '../interfaces/product-response';
import { RecursoEditado } from '../dto/edit-product';

const recursosUrl = `${environment.apiUrl}/products`;

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
constructor(private http: HttpClient, private loginService: LoginService) { }

  getAllRecursos(): Observable<Product[]> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get<Product[]>(`${recursosUrl}`, requestOptions);
   }

  createRecursos(recursoCreate: Product): Observable<RecursoCreateResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post<RecursoCreateResponse>(`${recursosUrl}`, recursoCreate, requestOptions);
  }

  editRecurso(recursoEditadoDto: RecursoEditado, id: number): Observable<RecursoCreateResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.put<RecursoCreateResponse>(`${recursosUrl}/${id}`, recursoEditadoDto, requestOptions);
}

  deleteRecurso(id: number): Observable<Product[]>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.delete<Product[]>(`${recursosUrl}/${id}`, requestOptions);
}

}