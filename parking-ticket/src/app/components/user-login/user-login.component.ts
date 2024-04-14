import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/authentication-service.service';
import { AlertService } from 'src/app/service/alert-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  contact: number
  password: string

  ngOnInit() {
    console.log("Insize On Inite");
    this.checkIfUserLoggedIn();
  }
  constructor(private router: Router, private authService: AuthenticationServiceService,private alertService: AlertService) {
    console.log("constructor")
  }


  checkIfUserLoggedIn() {
    console.log("checkIfUserLoggedIn");
    this.authService.getUser().subscribe(
      data => {
        const obj: any = data
        console.log(obj.data)
        if (obj.data != null) {
          this.router.navigate(['/user/parking/space']);
        }
      }, error => {
        if(error.error.status == 401){
          this.alertService.showAlert(error.error.message,"error");
          this.router.navigate(['/user/login']);
        }else{
          this.alertService.showAlert(error.error.message,"error");
        }
      }
    )
  }

  redirectToAnotherRoute() {
    this.router.navigate(['/user/register']);
  }
  redirectToForgotPassword() {
    this.router.navigate(['/user/reset/password']);
  }

  loginAsUser() {
    var data = {
      contact: this.contact,
      password: this.password
    }
    this.authService.loginAsUser(data).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/user/parking/space']);
      }, error => {
        if(error.error.status == 401){
          this.alertService.showAlert(error.error.message,"error");
          this.router.navigate(['/user/login']);
        }else{
          this.alertService.showAlert(error.error.message,"error");
        }
      }
    )
  }
}
