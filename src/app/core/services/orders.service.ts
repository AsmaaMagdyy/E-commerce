import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient: HttpClient , private _AuthenticationService:AuthenticationService) { }

  checkOutCod(idCart:string|null,shippingDetails: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/${idCart}`,
      {
        "shippingAddress": shippingDetails
      }
    )
  }

  checkOutOnline(idCart:string|null,shippingDetails: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${environment.urlServer}`,
      {
        "shippingAddress": shippingDetails
      }
    )
  }

  getUserOrders():Observable<any>{
    let userData=this._AuthenticationService.saveUserData() 
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`)
  }
}
