import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment.prod";
import { Market } from "../model/market";

const categoriasUrl = `${environment.apiUrl}/categories`;

@Injectable({
    providedIn: 'root'
  })
  export class MarketService {
constructor(private http: HttpClient, private loginService: LoginService) { }

  getAllMarkets(): Observable<Market[]> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get<Market[]>(`${categoriasUrl}`, requestOptions);
   }

   marketCreate(market: Market):Observable<Market>{
    const requestOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };


    return this.http.post<Market>(`${categoriasUrl}`, market, requestOptions);

  }

  deleteMarket(id: number): Observable<Market> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.delete<Market>(`${categoriasUrl}/${id}`, requestOptions);
  }

  updateMarket(market: Market): Observable<Market>{
    const requestOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.put<Market>(`${categoriasUrl}/${market.id}`,market,requestOptions);
  }
}