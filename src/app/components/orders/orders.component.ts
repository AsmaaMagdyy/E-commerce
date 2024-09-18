import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit,OnDestroy {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);
  private readonly toastr = inject(ToastrService);

  cartId: WritableSignal<string | null> = signal('');
  paramMapSub!: Subscription;
  checkOutOnlineSub!: Subscription;


  orders: FormGroup = new FormGroup({

    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),

  })
  ngOnInit(): void {
    this.paramMapSub=this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        // console.log(params.get('id'));
        this.cartId.set(params.get('id'));
      }
    })
  }

  orderSubmit(): void {
    console.log(this.orders.value);

    if (this.orders.valid) {
      console.log(this.orders.value);
      this.checkOutOnlineSub=this._OrdersService.checkOutOnline(this.cartId(), this.orders.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status == 'success') {
            res.session.url;
            window.open(res.session.url, '_self');

          }
        }
      })

    } else {
      this.toastr.error('Please enter Shipping address')
    }

  }

  ngOnDestroy(): void {
    this.paramMapSub?.unsubscribe();
    this.checkOutOnlineSub?.unsubscribe();
  }
}
