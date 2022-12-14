import { PizzaService } from './../../services/pizzas.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ToppingsService } from '../../services/toppings.service';

import { PizzasComponent } from './pizzas.component';

describe('PizzasComponent', () => {
  let component: PizzasComponent;
  let fixture: ComponentFixture<PizzasComponent>;

  beforeEach(async () => {
    const pizzaServiceSpy = jasmine.createSpyObj<PizzaService>(['getPizzas'])
    pizzaServiceSpy.getPizzas.and.returnValue(of([]))

    const toppingsServiceSpy = jasmine.createSpyObj<ToppingsService>(['getToppings'])
    toppingsServiceSpy.getToppings.and.returnValue(of([]))

    await TestBed.configureTestingModule({
      declarations: [ PizzasComponent ],
      providers: [
                  {provide: ToppingsService, useValue: toppingsServiceSpy },
                  {provide: PizzaService, useValue: pizzaServiceSpy }
                
                ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have pizzas', ()=>{
    expect(component._pizzaList).toBeTruthy();
  })

  it('should have a topping list', ()=>{
    expect(component._toppingList).toBeTruthy();
  })
});
