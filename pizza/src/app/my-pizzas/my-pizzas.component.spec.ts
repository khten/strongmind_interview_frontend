import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPizzasComponent } from './my-pizzas.component';

describe('MyPizzasComponent', () => {
  let component: MyPizzasComponent;
  let fixture: ComponentFixture<MyPizzasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPizzasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPizzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
