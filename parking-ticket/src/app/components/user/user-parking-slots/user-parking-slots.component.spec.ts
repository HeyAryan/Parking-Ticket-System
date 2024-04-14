import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserParkingSlotsComponent } from './user-parking-slots.component';

describe('UserParkingSlotsComponent', () => {
  let component: UserParkingSlotsComponent;
  let fixture: ComponentFixture<UserParkingSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserParkingSlotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserParkingSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
