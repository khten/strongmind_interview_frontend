import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ToppingsService } from '../toppings.service';

import { ToppingsComponent } from './toppings.component';

fdescribe('ToppingsComponent', () => {
 
  let component: ToppingsComponent;
  let fixture: ComponentFixture<ToppingsComponent>;

  beforeEach(async () => {
    const toppingServiceSpy = jasmine.createSpyObj<ToppingsService>(['getToppings']);
    toppingServiceSpy.getToppings.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      declarations: [ ToppingsComponent ],
      providers:[
          {provide: ToppingsService, useValue:toppingServiceSpy}
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(ToppingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a toppings array', () => {
     expect(component.toppings).toBeTruthy();
  });
});
