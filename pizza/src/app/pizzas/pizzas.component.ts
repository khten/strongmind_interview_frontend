import { ToppingsService } from './../toppings.service';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { PizzaService } from './../pizzas.service';
import { Component, OnInit } from '@angular/core';
import { Pizzas } from '../pizzas';
import { Topping } from '../toppings';
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';


@Component({
  selector: 'pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent implements OnInit {

  _toppingList:Topping[] = [];
  _pizza = new pizza();
  _pizzaList:pizza[] = [];
  uniquekey:number = 0;
  
  constructor(private toppingService:ToppingsService, private pizzaService:PizzaService){

  }

  ngOnInit(): void {
    this.getToppings();
    this.getPizzas();
    this._pizza = new pizza();
  }

  onChange(){
    console.log(this._toppingList);
  }

  onSubmit(){
    this.uniquekey = this._pizzaList.length;
    this.uniquekey = this.uniquekey + 1;
    this._pizza.id = this.uniquekey;
    this._pizza.toppingsId = this._toppingList.filter(x => x.isSelected == true).map(x=>x.id).join(',').toString();
    this._pizza.toppings = this._toppingList.filter(x => x.isSelected == true).map(x => x.name).join(', ').toString();
 
    this._pizzaList.push(this._pizza);

    this.pizzaService.createPizza({"name": this._pizza.name, "toppings":this._pizza.toppings}).subscribe({
        next: (response) => {console.log(`Creating pizza: ${response.id} ${response.name} with ${response.toppings}`)
                            console.log(response)
    }
    
    })
    this._pizza = new pizza();
    
    this.getToppings();
    

  }
  
  
  getPizzas(){
     this.pizzaService.getPizzas().subscribe({
        next: (data) => {
          console.log("Retrieving pizzas...");
          for(let i = 0; i < data.length; ++i){
            console.log(`Pizza Id: ${data[i].id} ${data[i].name} with ${data[i].toppings}`)
          }
          this._pizzaList = data;
          console.log("pizza list: " + this._pizzaList)
        } 
     })
  }

  getToppings(){
    
    this.toppingService.getToppings().subscribe({
       next: (data) => {
           this._toppingList = data;
           //Set the isSelected property to by false for the topping list here
           for(let i = 0; i < this._toppingList.length; ++i){
             this._toppingList[i].isSelected = false;
           }
       }
    })
  }
 

}
class topping{
  id: number = 0;
  name: string = '';
  isSelected:boolean = false;
}

class pizza{
  id:number = 0;
  name:string = '';
  toppingsId:string = '';
  toppings: string = ''
}
  //MODAL EXAMPLE 
  //open(content:any) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    
  //     let toppingList = this.availableToppings.filter(x => x.isSelected == true);

  //     this.pizzaService.createPizza({"name" : this.name, "toppings": toppingList}).subscribe({
  //       next:(response:Pizzas) => {
  //         console.log("Created new pizza " + response.name);
  //       },
  //       error:(err) => alert("Unable to create pizza"),
      
  //     })
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }