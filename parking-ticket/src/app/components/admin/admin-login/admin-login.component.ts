import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/authentication-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  userName: string = ''
  password: string = ''

  constructor(private authService: AuthenticationServiceService, private router: Router) {

  }

  ngOnInit() {
    this.checkIfUserLoggedIn();
  }


  checkIfUserLoggedIn() {
    console.log("checkIfUserLoggedIn");
    this.authService.getUser().subscribe(
      data => {
        const obj: any = data
        console.log(obj.data)
        if (obj.data != null) {
          this.router.navigate(['/admin/parking/space']);
        }
      }, error => {
        console.log(error)
      }
    )
  }

  loginAsAdmin() {
    console.log(this.userName)
    console.log(this.password)
    var data = {
      userName: this.userName,
      password: this.password
    }
    console.log(data)
    this.authService.loginAsAdmin(data).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/admin/parking/space']);
      }, error => {
        // alert("Error Occured")
        console.log("error occured");
      }
    )
  }
}
