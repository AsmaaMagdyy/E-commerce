import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  numOfCartItems :WritableSignal<number>=signal(0);


  constructor(private _HttpClient:HttpClient) { 
    this.getAllProductsInCart().subscribe({
      next: (res) => {
        console.log(res);
        this.numOfCartItems.set(res.numOfCartItems);
        // console.log(this.numOfCartItems);
      }
    })
  }

  



  addToCart(ProductID:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": ProductID,
      })
  }


  updateCartProductQuantity(count:number,ProductID:string):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${ProductID}`,
      {
        "count": count,
      })
  }


  getAllProductsInCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }


  removeSpecificCartItem(ProductID:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${ProductID}`)
  }


  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }

}
