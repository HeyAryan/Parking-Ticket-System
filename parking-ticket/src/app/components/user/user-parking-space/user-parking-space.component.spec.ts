import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserParkingSpaceComponent } from './user-parking-space.component';

describe('UserParkingSpaceComponent', () => {
  let component: UserParkingSpaceComponent;
  let fixture: ComponentFixture<UserParkingSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserParkingSpaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserParkingSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
