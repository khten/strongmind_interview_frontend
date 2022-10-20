import { HttpErrorResponse } from '@angular/common/http';
import { ToppingsService } from './../toppings.service';
import { Component, OnInit } from '@angular/core';
import { Topping } from '../toppings';

@Component({
  selector: 'toppings',
  templateUrl: './toppings.component.html',
  styleUrls: ['./toppings.component.css']
})
export class ToppingsComponent implements OnInit {

  toppings:Topping[] = [];
  toppings$;

  constructor(private toppingService:ToppingsService) { 
    this.toppings$ = this.toppingService.getToppings();
  }

  ngOnInit(): void {
    this.getToppings();
  }

  getToppings(){
    this.toppingService.getToppings().subscribe({
      next: (response:Topping[]) => 
        {
          this.toppings = response;
          this.toppings.forEach((element:Topping) =>{
            element.isEdit = false;
          });
        },
      error:(err:HttpErrorResponse) => alert(err.message)
    })
  }

  cancelEdit(t:Topping){
    t.isEdit = false;
  }
  addTopping(input:HTMLInputElement):void{
    let topping:any = {
      name: input.value,
      isEdit: false,
      isSelected: false
    }
    input.value=''
    
    this.toppingService.addTopping(topping).subscribe({
      next: (response:Topping) => {console.log(response)
           this.toppings.splice(0,0,topping);
      },
      error: (err:HttpErrorResponse) => alert("Duplicate Topping:  " + topping.name),
    })
    
  }
  editTopping(t: Topping):void{
     t.isEdit = true;
  }

  updateTopping(topping:Topping, updatedTopName: HTMLInputElement):void{
     
     topping.name = updatedTopName.value;

     this.toppingService.updateTopping(topping).subscribe({
      next: (response:Topping) => {console.log(response), topping.isEdit = false},
      error: (err:HttpErrorResponse) => alert("Unable to Update Topping:  " + topping.name + err.message),
      
    })
    
  }
  deleteTopping(t:Topping, index:number){
    this.toppingService.deleteTopping(t).subscribe({
      next: (response) => console.log(response),
      error: (err: HttpErrorResponse) => alert(err.message),
      complete: ()=>this.toppings.splice(index,1)
    })
  }
  
  

}
