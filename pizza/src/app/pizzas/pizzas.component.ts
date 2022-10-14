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

  public pizzas:Pizzas[] = [];
  public availableToppings:Topping[] = [];
  private closeResult = '';
  toppingList:Topping[] = [];
  name: string = '';
  setName: string = '';
  setToppings:Topping[] = [];
  dummyPizza: Pizzas ={"name": "someName", "toppings": [{"name": "onions", 
  isEdit:false, isSelected:true}]};

  constructor(private pizzaService:PizzaService, private modalService: NgbModal, private toppingService:ToppingsService) {
      
   }

  ngOnInit(): void {
    this.getAvailableToppings();
    this.getPizzas();
    
    
  }

 getAvailableToppings(){
  this.toppingService.getToppings().subscribe({
      next: (response:Topping[]) => this.availableToppings = response,
      error: (err) => console.log("an unexpected error occurred getting available toppings: " + err.message )
  })
 }
 getPizzas(){
    
    this.pizzaService.getPizzas().subscribe({
      next: (response) => {this.pizzas = response,
      console.log("in getPizzas response has " + this.pizzas.length + " elements")
      for(let i = 0; i < this.pizzas.length; ++i){
        console.log("Pizza " + i + " : " + this.pizzas[i].name )
        for(let j = 0; j < this.pizzas[i].toppings.length; ++j){
         console.log("Topping " + j + " : " + this.pizzas[i].toppings[j].name)
        }
      }
      },
      error:(err:HttpErrorResponse) => alert(err.message)
    })
  }
 

  onChange(topping:Topping){
    this.toppingList = this.availableToppings.filter(x => x.isSelected === true);  
  }

  onSubmit(){
    this.toppingList = this.availableToppings.filter(x => x.isSelected === true);
  }

  save(){

  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.name = "SomePizza"; 
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
