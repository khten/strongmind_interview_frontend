import { HttpErrorResponse } from '@angular/common/http';
import { PizzaService } from './../pizzas.service';
import { Component, OnInit } from '@angular/core';
import { Pizzas } from '../pizzas';

@Component({
  selector: 'pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent implements OnInit {

  public pizzas:Pizzas[] = [];
  
  constructor(private pizzaService:PizzaService) { }

  ngOnInit(): void {
    this.pizzaService.getPizzas().subscribe({
      next: (response:Pizzas[]) => this.pizzas = response,
      error:(err:HttpErrorResponse) => alert(err.message)
    })
  }

}
