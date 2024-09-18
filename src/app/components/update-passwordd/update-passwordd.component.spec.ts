import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePassworddComponent } from './update-passwordd.component';

describe('UpdatePassworddComponent', () => {
  let component: UpdatePassworddComponent;
  let fixture: ComponentFixture<UpdatePassworddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePassworddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePassworddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
