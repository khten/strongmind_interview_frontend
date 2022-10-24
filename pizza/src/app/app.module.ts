
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar.component';
import { PizzasComponent } from './components/pizzas/pizzas.component';
import { ToppingsComponent } from './components/toppings/toppings.component';
import {NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    PizzasComponent,
    ToppingsComponent,
   

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot([ 
      {path: 'pizzas', component:PizzasComponent},
      {path: 'toppings', component:ToppingsComponent},
      {path: '', redirectTo: '/pizzas', pathMatch: 'full'}
    ]),
   
  ],
  providers: [
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
