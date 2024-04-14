import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private http: HttpClient) { }

  apiUrl ="http://localhost:8080"

  registerUser(data:any){
    return this.http.post(`${this.apiUrl}/authentication/register`,data);
  }
  loginAsUser(data:any){
    return this.http.post(`${this.apiUrl}/authentication/login`,data,{withCredentials:true});
  }
  loginAsAdmin(data:any){
    return this.http.post(`${this.apiUrl}/authentication/admin/login`,data,{withCredentials:true});
  }
  getUser(){
    return this.http.get(`${this.apiUrl}/authentication/user`,{withCredentials:true});
  }
}
