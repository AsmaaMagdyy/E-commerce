import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { IUserOrders } from '../../core/interfaces/iuser-orders';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe,CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
  ordersList:WritableSignal<IUserOrders[]>=signal([])
  constructor(private _OrdersService:OrdersService){}

  ngOnInit(): void {

    this.getUserOrders()
  }
getUserOrders():void{
  this._OrdersService.getUserOrders().subscribe({
    next:(res)=>{
      console.log(res);
      this.ordersList.set(res)
      
    }
  })
}


}
