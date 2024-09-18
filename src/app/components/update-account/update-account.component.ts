import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-account',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.scss'
})
export class UpdateAccountComponent implements OnDestroy{

  private readonly _AuthenticationService = inject(AuthenticationService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly toastr = inject(ToastrService);
  
  isLoading:WritableSignal<boolean>=signal(false);
  updateAccountSub!:Subscription;

  updateForm: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  })

  updateSubmit():void{
    this.isLoading.set(true);
    if (this.updateForm.valid) {
     
      this.updateAccountSub=this._AuthenticationService.updateAccount(this.updateForm.value).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.toastr.success('Account Updated Successfuly')
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

  ngOnDestroy(): void {
    this.updateAccountSub?.unsubscribe();
  }
}
