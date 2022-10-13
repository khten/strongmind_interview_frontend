import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToppingFormComponent } from './topping-form.component';

describe('ToppingFormComponent', () => {
  let component: ToppingFormComponent;
  let fixture: ComponentFixture<ToppingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToppingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToppingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
