import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-cash',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout-cash.component.html',
  styleUrl: './checkout-cash.component.scss'
})
export class CheckoutCashComponent implements OnInit ,OnDestroy {
  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _OrdersService=inject(OrdersService);
  private readonly _router = inject(Router)
  private readonly _CartService = inject(CartService)
  private readonly toastr = inject(ToastrService);

  cartId:WritableSignal<string|null>=signal('');
  checkOutCodSub!:Subscription;
  paramMapSub!:Subscription;


 orders:FormGroup=new FormGroup({
  
      details: new FormControl(null,[Validators.required]),
      phone: new FormControl(null,[Validators.required]),
      city: new FormControl(null,[Validators.required]),
      
})
ngOnInit(): void {
  this.paramMapSub=this._ActivatedRoute.paramMap.subscribe({
    next: (params) => {
      // console.log(params.get('id'));
    this.cartId.set(params.get('id'));
    }
  })
}

orderSubmit():void{
  if (this.orders.valid) {
    console.log(this.orders.value);
  this.checkOutCodSub=this._OrdersService.checkOutCod(this.cartId(),this.orders.value).subscribe({
    next: (res) => {
      console.log(res);
      if (res.status == 'success') {
        
        this._router.navigate(['/allorders'])
        this._CartService.numOfCartItems.set(0);
        
      }
    }
  })
  }else{
    this.toastr.error('Please enter Shipping address')
  }
}

ngOnDestroy(): void {
  this.checkOutCodSub?.unsubscribe();
  this.paramMapSub?.unsubscribe();
}
}
