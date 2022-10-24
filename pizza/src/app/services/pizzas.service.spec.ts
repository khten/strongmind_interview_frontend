import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Pizzas } from '../models/pizzas';

import { PizzaService } from './pizzas.service';

describe('PizzasService', () => {
  let service: PizzaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[PizzaService]
    });
    service = TestBed.inject(PizzaService);
    httpMock = TestBed.inject(HttpTestingController)
  });
  afterEach(()=>{
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("getPizzas", () =>{
    it('should retrieve pizzas', ()=>{
      const dummyPizzas:Pizzas[] =[
        {id: 1, name: 'Monster', toppings:'green chile, pepperoni,onions'},
        {id: 2, name: 'Monster2', toppings:'green chile, pepperoni'},
        {id: 3, name: 'Monster3', toppings:'green chile'}
      ]
      service.getPizzas().subscribe(pizzas => {
        expect(pizzas.length).toBe(dummyPizzas.length);
        expect(pizzas).toEqual(dummyPizzas);
      })

      const request = httpMock.expectOne(`${service.apiServerUrl}/all`);
      expect(request.request.method).toBe('GET');
      request.flush(dummyPizzas);
    })
  })
 
  describe("createPizza", () =>{
    it('should create a new pizza', ()=>{
      const dummyPizza:Pizzas =
        {id: 1, name: 'Monster', toppings:'green chile, pepperoni,onions'};
        
      service.createPizza(dummyPizza).subscribe(pizza => {
        expect(pizza.id).toBe(dummyPizza.id);
        expect(pizza.name).toEqual(dummyPizza.name);
        expect(pizza.toppings).toEqual(dummyPizza.toppings);
      })

      const request = httpMock.expectOne(`${service.apiServerUrl}/create-new-pizza`);
      expect(request.request.method).toBe('POST');
      request.flush(dummyPizza);
    })
  })
  
  describe("updatePizza", () =>{
    it('should update a  pizza', ()=>{
      const dummyPizza:Pizzas =
        {id: 1, name: 'Monster', toppings:'green chile, pepperoni,onions'};
        
      service.updatePizza(dummyPizza).subscribe(pizza => {
        expect(pizza.id).toBe(dummyPizza.id);
        expect(pizza.name).toEqual(dummyPizza.name);
        expect(pizza.toppings).toEqual(dummyPizza.toppings);
      })

      const request = httpMock.expectOne(`${service.apiServerUrl}/update-pizza`);
      expect(request.request.method).toBe('PUT');
      request.flush(dummyPizza);
    })
  })

    
  describe("deletePizza", () =>{
    it('should delete a  pizza', ()=>{
      const dummyPizza:Pizzas =
        {id: 1, name: 'Monster', toppings:'green chile, pepperoni,onions'};
        
      service.deletePizza(1).subscribe();

      const request = httpMock.expectOne(`${service.apiServerUrl}/delete/${dummyPizza.id}`);
      expect(request.request.method).toBe('DELETE');
      
    })
  })
})
