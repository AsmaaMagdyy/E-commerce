import { Component, inject, WritableSignal, signal, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnDestroy{
  
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthenticationService = inject(AuthenticationService);
  private readonly _Router = inject(Router);

  step:WritableSignal<number> = signal(1)
  message:WritableSignal<string> = signal('');
  setEmailVerifySub!:Subscription;
  setCodeVerifySub!:Subscription;
  setResetPassSub!:Subscription;


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

    
    this.setEmailVerifySub=this._AuthenticationService.setEmailVerify(this.VerifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg === 'success') {
          this.message.set(res.message);
          setTimeout(() => {
            this.step.set(2)
            this.message.set('')
          }, 3000)
        }

      }
    });
  }

  verifyCodeSubmit(): void {
    this.setCodeVerifySub=this._AuthenticationService.setCodeVerify(this.VerifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'Success') {
          this.message.set(res.status);
          setTimeout(() => {
            this.step.set(3);
            this.message.set('')
          }, 3000)

        }

      }
    });
  }

  resetPasswordSubmit():void{
    this.setResetPassSub=this._AuthenticationService.setResetPass(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
       localStorage.setItem('userToken',res.token)
       this._AuthenticationService.saveUserData();
        this._Router.navigate(['/home'])
      }
    });
  }
ngOnDestroy(): void {
  this.setEmailVerifySub?.unsubscribe();
  this.setCodeVerifySub?.unsubscribe();
  this.setResetPassSub?.unsubscribe();
}
}
