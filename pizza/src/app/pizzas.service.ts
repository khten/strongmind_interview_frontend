import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pizzas } from './pizzas';
@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiServerUrl= environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPizzas(): Observable<Pizzas[]>{
    return this.http.get<Pizzas[]>(`${this.apiServerUrl}/pizza/all`);
  }

  public createPizza(pizza:Pizzas): Observable<Pizzas>{
     return this.http.post<Pizzas>(`${this.apiServerUrl}/pizza/create-new-pizza`, pizza);
  }

  public updateEmployee(pizza:Pizzas): Observable<Pizzas>{
    return this.http.put<Pizzas>(`${this.apiServerUrl}/pizza/update-pizza`, pizza);
 }

 public deleteEmployee(name:string): Observable<void>{
  return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${name}`);
}




}
