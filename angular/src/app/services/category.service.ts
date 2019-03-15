import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment.prod";
import { Category } from "../interfaces/category-response";
import { ListApiResponse } from "../interfaces/listApi";

const categoryUrl = `${environment.apiUrl}/categories`;

@Injectable({
    providedIn: 'root'
  })
  export class CategoryService {
constructor(private http: HttpClient, private loginService: LoginService) { }

  getAllCategorias(): Observable<ListApiResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get<ListApiResponse>(`${categoryUrl}`, requestOptions);
   }

   categoriasCreate(categoryDto: Category):Observable<Category>{
    const requestOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post<Category>(`${categoryUrl}`, categoryDto, requestOptions);
  }

  eliminarCategorias(id: number): Observable<Category> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.delete<Category>(`${categoryUrl}/${id}`, requestOptions);
  }

  updateCategorias(category: Category, id: string){
    const requestOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.put<Category>(`${categoryUrl}/${id}`, category, requestOptions);
  }
}