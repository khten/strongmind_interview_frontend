
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { PizzasComponent } from './pizzas/pizzas.component';
import { ToppingsComponent } from './toppings/toppings.component';
import { MyPizzasComponent } from './my-pizzas/my-pizzas.component';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ToppingFormComponent } from './topping-form/topping-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    PizzasComponent,
    ToppingsComponent,
    MyPizzasComponent,
    ToppingFormComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component:HomeComponent},
    
      {path: 'pizzas', component:PizzasComponent},
      {path: 'login', component:LoginComponent},
      {path: 'toppings/new', component:ToppingFormComponent},
      {path: 'toppings/:id', component:ToppingFormComponent},
      {path: 'toppings', component:ToppingsComponent},
    ]),
   
  ],
  providers: [
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
