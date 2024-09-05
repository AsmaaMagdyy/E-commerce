import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCashComponent } from './checkout-cash.component';

describe('CheckoutCashComponent', () => {
  let component: CheckoutCashComponent;
  let fixture: ComponentFixture<CheckoutCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutCashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
