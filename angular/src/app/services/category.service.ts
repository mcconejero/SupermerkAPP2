import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment.prod";
import { Category } from "../interfaces/category-response";
import { CategoryDto } from "../dto/create-category.dto";

const categoriasUrl = `${environment.apiUrl}/categories`;

@Injectable({
    providedIn: 'root'
  })
  export class CategoryService {
constructor(private http: HttpClient, private loginService: LoginService) { }

  getAllCategorias(): Observable<Category[]> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get<Category[]>(`${categoriasUrl}`, requestOptions);
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

  updateCategory(category: Category): Observable<Category>{
    const requestOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.put<Category>(`${categoriasUrl}/${category.id}`,category,requestOptions);
  }
}