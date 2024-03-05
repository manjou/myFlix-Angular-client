import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginFormComponentComponent } from './user-login-form.component';

describe('UserLoginFormComponentComponent', () => {
  let component: UserLoginFormComponentComponent;
  let fixture: ComponentFixture<UserLoginFormComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLoginFormComponentComponent]
    });
    fixture = TestBed.createComponent(UserLoginFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
