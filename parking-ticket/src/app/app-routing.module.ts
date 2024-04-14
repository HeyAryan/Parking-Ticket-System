import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserResetPasswordComponent } from './components/user-reset-password/user-reset-password.component';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { ParkingSpaceComponent } from './components/admin/parking-space/parking-space.component';
import { ParkingSlotComponent } from './components/admin/parking-slot/parking-slot.component';
import { UserParkingSpaceComponent } from './components/user/user-parking-space/user-parking-space.component';
import { UserParkingSlotsComponent } from './components/user/user-parking-slots/user-parking-slots.component';
import { BookingHistoryComponent } from './components/user/booking-history/booking-history.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'user/login', pathMatch: 'full'
  },
  {
    path: 'admin/login', component: AdminLoginComponent
  },
  {
    path: 'user/login', component: UserLoginComponent
  },
  {
    path: 'user/register', component: UserRegisterComponent
  },
  {
    path: 'user/reset/password', component: UserResetPasswordComponent
  },
  {
    path: 'user/home', component: HomeComponent
  },
  {
    path: 'user/booking/history', component: BookingHistoryComponent
  },
  {
    path: 'user/parking/space', component: UserParkingSpaceComponent
  },
  {
    path: 'user/parking/space/:parkingSpaceId', component: UserParkingSlotsComponent
  },
  {
    path: 'admin/dashboard', component: AdminDashboardComponent
  },
  {
    path: 'admin/parking/space', component: ParkingSpaceComponent
  },
  {
    path: 'admin/parking/slot/:parkingSpaceId', component: ParkingSlotComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
