import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Topping } from '../models/toppings';

@Injectable({
  providedIn: 'root'
})
export class ToppingsService {
  apiServerUrl = environment.apiBaseUrl + '/toppings';
  
  constructor(private http:HttpClient) { }

  public getToppings(): Observable<Topping[]>{
    return this.http.get<Topping[]>(`${this.apiServerUrl}/all`);
  }

  public addTopping(topping:any):Observable<Topping>{
    return this.http.post<Topping>(`${this.apiServerUrl}/add`, topping);
  }

  public updateTopping(topping:any):Observable<Topping>{
    return this.http.put<Topping>(`${this.apiServerUrl}/update`, topping);
  }

  public deleteTopping(topping:Topping, index:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${topping.id}`);
  }
}