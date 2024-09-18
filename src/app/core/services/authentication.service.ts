import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly _HttpClient=inject(HttpClient);
  private readonly _Router=inject(Router);

  userData!:any
  
  setRegisterForm(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }
  setLoginForm(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }

  saveUserData():any{
    if(localStorage.getItem('userToken') !== null){
      this.userData=jwtDecode(localStorage.getItem('userToken')!)
      console.log(this.userData);
      return this.userData;
      
    }
  }


  logOut():void{
    localStorage.removeItem('userToken');
    this.userData=null;
    this._Router.navigate(['/login']);
  }

  setEmailVerify(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
  }

  setCodeVerify(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
  }
  setResetPass(data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
  }
  updateAccount(data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/users/updateMe/`,data)
  }
  updatePassword(data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/users/changeMyPassword`,data,
      {
        headers:{token:localStorage.getItem('userToken')!}
      }
    )
  }

}
