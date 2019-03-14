import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment.prod";
import { Category } from "../interfaces/category-response";
import { CategoryDto } from "../dto/create-category.dto";
import { ListApiResponse } from "../interfaces/listApi";

const categoriasUrl = `${environment.apiUrl}/categories`;

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

    return this.http.get<ListApiResponse>(`${categoriasUrl}`, requestOptions);
   }

   categoryCreate(crearCategoriaDto: CategoryDto):Observable<Category>{
    const requestOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.post<Category>(`${categoriasUrl}`, crearCategoriaDto, requestOptions);
  }

  eliminarCategoria(id: number): Observable<Category> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.delete<Category>(`${categoriasUrl}/${id}`, requestOptions);
  }

  updateCategory(category: Category, id: string){
    const requestOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.put<Category>(`${categoriasUrl}/${id}`, category, requestOptions);
  }
}