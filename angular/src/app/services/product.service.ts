import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../model/product';
import { LoginService } from './login.service';
import { ProductResponse } from '../interfaces/product-response';
import { RecursoEditado } from '../dto/edit-product';
import { ListApiResponse } from '../interfaces/listApi';

const productsUrl = `${environment.apiUrl}/products`;

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
constructor(private http: HttpClient, private loginService: LoginService) { }

  getAllProducts(): Observable<ListApiResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get<ListApiResponse>(`${productsUrl}`, requestOptions);
   }

  createRecursos(recursoCreate: Product): Observable<ProductResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post<ProductResponse>(`${productsUrl}`, recursoCreate, requestOptions);
  }

  editRecurso(recursoEditadoDto: RecursoEditado, id: number): Observable<ProductResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.put<ProductResponse>(`${productsUrl}/${id}`, recursoEditadoDto, requestOptions);
}

  deleteRecurso(id: number): Observable<Product[]>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.delete<Product[]>(`${productsUrl}/${id}`, requestOptions);
}

}