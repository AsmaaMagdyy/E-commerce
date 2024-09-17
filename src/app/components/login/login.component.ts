import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly _AuthenticationService=inject(AuthenticationService);
  private readonly _FormBuilder=inject(FormBuilder);
  private readonly _Router=inject(Router);
  private readonly toastr = inject(ToastrService);




  
  isLoading:WritableSignal<boolean>=signal(false);



  loginForm:FormGroup = this._FormBuilder.group({
    email:[null,[Validators.required, Validators.email]],
    password:[null,[Validators.required, Validators.pattern(/^\w{6,}$/)]],
  })




  loginSubmit(): void {
    this.isLoading.set(true);


    if(this.loginForm.valid){
      this._AuthenticationService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          console.log(res);
          if (res.message == 'success') {
            this.toastr.success('Success  and navigate to home in 2 seconds ')
            setTimeout(()=>{
               // 1- store token in local storage
              // 2- decode token in authService to make it shared 
              // 3- navigate to home component
              localStorage.setItem('userToken', res.token);
              this._AuthenticationService.saveUserData();
              this._Router.navigate(['/home'])
            },2000)
           
          }
        },
        error:(err:HttpErrorResponse)=>{
          this.isLoading.set(false);
          console.log(err.error.message);
          
        }
      })
    }else{
      
      this.loginForm.markAllAsTouched();
    }
   

  }

}
