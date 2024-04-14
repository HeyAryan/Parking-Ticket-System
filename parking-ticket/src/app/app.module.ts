import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserResetPasswordComponent } from './components/user-reset-password/user-reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { ParkingSpaceComponent } from './components/admin/parking-space/parking-space.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParkingSlotComponent } from './components/admin/parking-slot/parking-slot.component';
import { UserParkingSpaceComponent } from './components/user/user-parking-space/user-parking-space.component';
import { UserParkingSlotsComponent } from './components/user/user-parking-slots/user-parking-slots.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BookingHistoryComponent } from './components/user/booking-history/booking-history.component';
import {MatTableModule} from '@angular/material/table';
import { HumanReadableDatePipe } from './pipe/HumanReadableDatePipe';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserResetPasswordComponent,
    HomeComponent,
    AdminDashboardComponent,
    ParkingSpaceComponent,
    ParkingSlotComponent,
    UserParkingSpaceComponent,
    UserParkingSlotsComponent,
    BookingHistoryComponent,
    HumanReadableDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
