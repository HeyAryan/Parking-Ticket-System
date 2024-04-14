import { Component } from '@angular/core';

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.css']
})
export class UserResetPasswordComponent {
  isOtpSent:boolean = false;

  sendOtp(){
    console.log("OTP Sent");
    this.isOtpSent = true;
  }
}
