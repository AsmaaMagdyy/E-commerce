import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthenticationService = inject(AuthenticationService);
  private readonly _Router = inject(Router);

  step: number = 1
  message: string = ''
  VerifyEmail: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]]
  })

  VerifyCode: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^\w{5,}$/)]]
  })


  resetPassword: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  })


  verifyEmailSubmit(): void {

    //when user submit ---> Get Value --> Email and resend to form 3 inside email input

    let emailValue = this.VerifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(emailValue);

    
    this._AuthenticationService.setEmailVerify(this.VerifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg === 'success') {
          this.message = res.message;
          setTimeout(() => {
            this.step = 2
            this.message = ''
          }, 3000)
        }

      }
    });
  }

  verifyCodeSubmit(): void {
    this._AuthenticationService.setCodeVerify(this.VerifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'Success') {
          this.message = res.status;
          setTimeout(() => {
            this.step = 3
            this.message = ''
          }, 3000)

        }

      }
    });
  }

  resetPasswordSubmit():void{
    this._AuthenticationService.setResetPass(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
       localStorage.setItem('userToken',res.token)
       this._AuthenticationService.saveUserData();
        this._Router.navigate(['/home'])
      }
    });
  }

}
