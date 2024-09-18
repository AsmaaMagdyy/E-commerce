import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-passwordd',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './update-passwordd.component.html',
  styleUrl: './update-passwordd.component.scss'
})
export class UpdatePassworddComponent implements OnDestroy {
  private readonly _AuthenticationService = inject(AuthenticationService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly toastr = inject(ToastrService);
  
  isLoading:WritableSignal<boolean>=signal(false);
  updatePassSub!:Subscription;

  updateForm: FormGroup = this._FormBuilder.group({
    currentPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    rePassword: [null]
  }, { validators: this.confirmPassword })

  updateSubmit():void{
    this.isLoading.set(true);
    if (this.updateForm.valid) {
     
      this. updatePassSub=this._AuthenticationService.updatePassword(this.updateForm.value).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.toastr.success('Password Updated Successfuly')
          console.log(this.updateForm.value);
          console.log(res);
          this._AuthenticationService.logOut();

        
          
        }
      })
    }else{
      this.toastr.error('Please fill all fields');
      this.isLoading.set(false);
    }
   

  }
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true }
    }
  }

  ngOnDestroy(): void {
    this. updatePassSub?.unsubscribe();
  }

}
