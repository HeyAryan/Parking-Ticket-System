import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from 'src/app/authentication-service.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {

  username: string
  contact: string
  password: string
  confirmPassword: string

  constructor(private router: Router,private apiService:AuthenticationServiceService){

  }


  redirectToAnotherRoute(){
    this.router.navigate(['/user/login']);
  }

  registerUser(){
    console.log(this.username);
    console.log(this.password);
    console.log(this.contact);
    console.log(this.confirmPassword);
    if(this.password != this.confirmPassword){
      alert("password doesnt match")
    }
    console.log("all good")
    var userDto = {
      contact:this.contact,
      userName:this.username,
      password:this.password,
    }

    this.apiService.registerUser(userDto).subscribe(
      data=>{
        console.log(data)
        alert("User Registered")
      },error=>{
        alert("Error Occured")
      }
    )
  }
}
