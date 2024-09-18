import { Component, OnInit, signal, WritableSignal, OnDestroy } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { IUserOrders } from '../../core/interfaces/iuser-orders';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe,CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit,OnDestroy{
  ordersList:WritableSignal<IUserOrders[]>=signal([])

  getUserOrdersSub!:Subscription

  constructor(private _OrdersService:OrdersService){}

  ngOnInit(): void {

    this.getUserOrders()
  }
getUserOrders():void{
  this.getUserOrdersSub=this._OrdersService.getUserOrders().subscribe({
    next:(res)=>{
      console.log(res);
      this.ordersList.set(res)
      
    }
  })
}

ngOnDestroy(){
  this.getUserOrdersSub?.unsubscribe();
}


}
