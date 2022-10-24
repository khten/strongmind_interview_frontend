import { ToppingsService } from '../../services/toppings.service';

import { Component, OnInit } from '@angular/core';
import { Topping } from '../../models/toppings';
import { Pizzas } from 'src/app/models/pizzas';
import { PizzaService } from 'src/app/services/pizzas.service';



@Component({
  selector: 'pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent implements OnInit {

  _toppingList:Topping[] = [];
  _pizza = new pizza();
  _pizzaList:pizza[] = [];
  topArray:string[] = [];
  uniquekey:number = 0;
  isEditing:boolean = false;
  

  constructor(private toppingService:ToppingsService, private pizzaService:PizzaService){

  }

  ngOnInit(): void {
    this.getToppings();
    this.getPizzas();
    this._pizza = new pizza();
  }

  edit(pizza:pizza){
    this.isEditing = true;   
    let selectedToppingsList = pizza.toppings.split(', ');
    console.log("selected toppings in edit: " + selectedToppingsList)
    for(let j = 0; j < selectedToppingsList.length; ++j){
      console.log("Current topping: " + selectedToppingsList[j])
    }
    for(let i = 0; i < this._toppingList.length; ++i){
      console.log("topping found: " + this._toppingList[i].name)
       this._toppingList.filter(x => x.name == (selectedToppingsList[i])).map(x=>x.isSelected = true)
    }
    
    this._pizza.name = pizza.name;
    this._pizza.id = pizza.id;
  }

  delete(pizzaId:number){
    this.pizzaService.deletePizza(pizzaId).subscribe({
      next: ()=> console.log("Pizza " + pizzaId + " has been deleted"),
      error:() => console.log("An unexpected error occurred.  Unable to delete pizza"),
      complete:() => this.getPizzas()
    })
  }
  onChange(){
    console.log(this._toppingList);
  }

  onSubmit(){

    let index = this._pizzaList.findIndex(x=>x.name == this._pizza.name);
    this._pizza.toppings = this._toppingList.filter(x => x.isSelected == true).map(x => x.name).join(', ').toString();
      
    if(!this.isEditing){
      this.pizzaService.createPizza({"name": this._pizza.name, "toppings":this._pizza.toppings}).subscribe({
          next: (response:Pizzas) => {
                         //    this.uniquekey = this._pizzaList.length;
                         //    this.uniquekey = this.uniquekey + 1;
                             this._pizza.id = response.id;
                              console.log(`Creating pizza: ${response.id} ${response.name} with ${response.toppings}`)
                              console.log(response);
                              
                              this._pizzaList.push(this._pizza);
                              this.getPizzas();
                              },
          error: () => alert(`Cannot create pizza...:  Pizzas must have unique names and a unique list of toppings`)

      })
    }else{
      this.pizzaService.updatePizza({"id": this._pizza.id, "name": this._pizza.name, "toppings":this._pizza.toppings}).subscribe({
        next: (response:Pizzas) => 
          { console.log(`Updating pizza: ${response.id} ${response.name} with ${response.toppings}`)
           
         },
        error: () => alert(`Cannot update pizza...:  Pizzas must have unique names and a unique list of toppings`),
        complete:() => { this.isEditing = false;  this.getPizzas();}
      })
     
      
    }
    this._pizza = new pizza();
    
    this.getToppings();
    

  }
  
  getPizzas(){
     this.pizzaService.getPizzas().subscribe({
        next: (data:Pizzas[]) => {
          console.log("Retrieving pizzas...");
          for(let i = 0; i < data.length; ++i){
            console.log(`Pizza Id: ${data[i].id} ${data[i].name} with ${data[i].toppings}`)
          }
          this._pizzaList = data;
          console.log(this._pizzaList)
        } 
     })
  }

  getToppings(){
    
    this.toppingService.getToppings().subscribe({
       next: (data:Topping[]) => {
           this._toppingList = data;
           //Set the isSelected property to by false for the topping list here
           for(let i = 0; i < this._toppingList.length; ++i){
             this._toppingList[i].isSelected = false;
           }
       }
    })
  }
 

}


class pizza{
  id:number = 0;
  name:string = '';
  toppings: string = '';
  
}