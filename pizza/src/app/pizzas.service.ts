import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pizzas } from './pizzas';
import {Topping} from './toppings'

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiServerUrl= environment.apiBaseUrl + '/pizza';

  constructor(private http: HttpClient) { }

  public getPizzas(): Observable<any[]>{
    return this.http.get<Pizzas[]>(`${this.apiServerUrl}/all`);
  }

 
  public createPizza(pizza:any): Observable<Pizzas>{
    console.log("createPizza triggered with pizza: " + pizza.name );
    console.log(`call to ${this.apiServerUrl}/create-new-pizza`)
     return this.http.post<Pizzas>(`${this.apiServerUrl}/create-new-pizza`, pizza);
  }

  public updatePizza(pizza:any): Observable<Pizzas>{
    return this.http.put<Pizzas>(`${this.apiServerUrl}/update-pizza`, pizza);
 }

 public deletePizza(id: number): Observable<void>{
  return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`);
}




}
