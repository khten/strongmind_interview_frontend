
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { PizzasComponent } from './pizzas/pizzas.component';
import { ToppingsComponent } from './toppings/toppings.component';
import { MyPizzasComponent } from './my-pizzas/my-pizzas.component';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    PizzasComponent,
    ToppingsComponent,
    MyPizzasComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot([
    
      {path: 'pizzas', component:PizzasComponent},
      {path: 'toppings', component:ToppingsComponent}
    ]),
   
  ],
  providers: [
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
