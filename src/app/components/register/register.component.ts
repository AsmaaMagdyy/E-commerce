import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _AuthenticationService = inject(AuthenticationService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  private readonly toastr = inject(ToastrService);



  isLoading:WritableSignal<boolean>=signal(false);


  registerForm: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    rePassword: [null],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, { validators: this.confirmPassword })

  registerSubmit(): void {
    this.isLoading.set(true);


    if (this.registerForm.valid) {
      this._AuthenticationService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {

          console.log(res);
          if (res.message == 'success') {
            this.toastr.success('Success  and navigate to home in 2 seconds ')
            setTimeout(() => {
              this._Router.navigate(['/login'])
            }, 2000)

          }
          this.isLoading.set(false);
        },
        error: (err: HttpErrorResponse) => {

          console.log(err.error.message);
          this.isLoading.set(false);
        }
      })
    } else {
      this.registerForm.setErrors({ mismatch: true })
      this.registerForm.markAllAsTouched();
    }


  }
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true }
    }
  }
}
