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
  // toppings$;

  constructor(private toppingService:ToppingsService) { 
    // this.toppings$ = this.toppingService.getToppings();
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
    let top:any = {
      
      "name": input.value
    }
   

    input.value=''
    console.log("top: " + top.name)
    this.toppingService.addTopping(top.name).subscribe({
      next: (response:Topping) => {console.log(response)
           response.isEdit = false;
           response.isSelected = false;
           this.toppings.splice(0,0,response);
      },
      error: (err:HttpErrorResponse) => alert("Topping with the name: " + top.name + " already exists"),
    })
    
  }
  editTopping(t: Topping):void{
     t.isEdit = true;
  }

  updateTopping(topping:Topping, updatedTopName: HTMLInputElement):void{
     
     topping.name = updatedTopName.value;
     console.log(topping.id);
     this.toppingService.updateTopping({"id": topping.id, "name": topping.name}).subscribe({
      next: (response:Topping) => {console.log(response), response.isEdit = false, response.isSelected=false, response.isEdit = false},
      error: (err) => alert("Unable to Update Topping:  " + topping.name + " already exists"),
      complete:() => topping.isEdit = false 
    })
    
  }
  deleteTopping(topping:Topping, index:number){
    this.toppingService.deleteTopping(topping,index).subscribe({
      next: (response) => console.log(response),
      error: (err: HttpErrorResponse) => alert(err.message),
      complete: ()=>this.toppings.splice(index,1)
    })
  }
  
  

}