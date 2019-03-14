import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment.prod";
import { Market } from "../model/market";
import { ListApiResponse } from "../interfaces/listApi";

const marketsUrl = `${environment.apiUrl}/markets`;

@Injectable({
    providedIn: 'root'
  })
  export class MarketService {
constructor(private http: HttpClient, private loginService: LoginService) { }

  getAllMarkets(): Observable<ListApiResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };

    return this.http.get<ListApiResponse>(`${marketsUrl}`, requestOptions);
   }

   marketCreate(market: Market):Observable<Market>{
    const requestOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };


    return this.http.post<Market>(`${marketsUrl}`, market, requestOptions);

  }

  deleteMarket(id: number): Observable<Market> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.delete<Market>(`${marketsUrl}/${id}`, requestOptions);
  }

  updateMarket(market: Market): Observable<Market>{
    const requestOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.put<Market>(`${marketsUrl}/${market.id}`,market,requestOptions);
  }
}