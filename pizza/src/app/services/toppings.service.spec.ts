import { TestBed } from '@angular/core/testing';

import { ToppingsService } from './toppings.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { Topping } from '../models/toppings';
describe('ToppingsService', () => {
  let service: ToppingsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ToppingsService);
    httpMock = TestBed.inject(HttpTestingController);
    
  });

  afterEach(()=>{
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('getToppings', ()=>{
    it('should get the available toppings', ()=>{
      const dummyToppings:Topping[] = [
        {id: 1, name: 'pepperoni', isEdit: false, isSelected: false}, 
        {id: 2, name: 'onions', isEdit: false, isSelected: false}
      ]

      service.getToppings().subscribe(toppings =>{
        expect(toppings.length).toBe(dummyToppings.length);
        expect(toppings).toEqual(toppings);
      })
      const request = httpMock.expectOne(`${service.apiServerUrl}/all`);
      expect(request.request.method).toBe('GET');
      request.flush(dummyToppings);
    })
  })

  describe('add topping', () =>{
    it('should create a new topping', () =>{
      const dummyTopping:Topping = 
        {id: 1, name: 'pepperoni', isEdit: false, isSelected: false};

        service.addTopping(dummyTopping).subscribe(topping => {
          expect(topping.id).toBe(dummyTopping.id);
          expect(topping.name).toBe(dummyTopping.name);
          expect(topping.isEdit).toBeFalsy();
          expect(topping.isSelected).toBeFalsy();    
        })

        const request= httpMock.expectOne(`${service.apiServerUrl}/add`)
        expect(request.request.method).toBe('POST');
        request.flush(dummyTopping);
    })
  })

  
  describe('update topping', () =>{
    it('should update an existing topping', () =>{
      const dummyTopping:Topping = 
        {id: 1, name: 'pepperoni', isEdit: false, isSelected: false};

        service.updateTopping(dummyTopping).subscribe(topping => {
          expect(topping.id).toBe(dummyTopping.id);    
        })

        const request= httpMock.expectOne(`${service.apiServerUrl}/update`)
        expect(request.request.method).toBe('PUT');
        request.flush(dummyTopping);
    })
  })

  describe('update topping', () =>{
    it('should update an existing topping', () =>{
      const dummyTopping:Topping = 
        {id: 1, name: 'pepperoni', isEdit: false, isSelected: false};

        service.updateTopping(dummyTopping).subscribe(topping => {
          expect(topping.id).toBe(dummyTopping.id);    
        })

        const request= httpMock.expectOne(`${service.apiServerUrl}/update`)
        expect(request.request.method).toBe('PUT');
        request.flush(dummyTopping);
    })
  })

  describe('deleteTopping', () =>{
    it('should delete a topping by id', () =>{
      const dummyTopping:Topping = 
        {id: 1, name: 'pepperoni', isEdit: false, isSelected: false};
       
      service.deleteTopping(dummyTopping,dummyTopping.id).subscribe();
      const request = httpMock.expectOne(`${service.apiServerUrl}/delete/${dummyTopping.id}`) 
      expect(request.request.method).toBe('DELETE') 
    })
  })

});
