import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { BsNavbarComponent } from './bs-navbar.component';

describe('BsNavbarComponent', () => {
  let component: BsNavbarComponent;
  let fixture: ComponentFixture<BsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BsNavbarComponent ],
      imports:[RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should have 2 links', ()=>{
    expect(fixture.debugElement.queryAll(By.css('a')).length).toBe(2);
  });
});
