import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlistItemsNum:WritableSignal<number>=signal(0);
  constructor(private _http: HttpClient) {
    this.getWishlist().subscribe({
      next:(res)=>{
        this.wishlistItemsNum.set(res.count);
        console.log(this.wishlistItemsNum());
        
      }
    })
   }

  addProductToWishlist(id: string): Observable<any> {
    return this._http.post(`${environment.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
      }
    )

  }

  removeProductFromWishlist(id: string): Observable<any> {
    return this._http.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`)

  }

  getWishlist(): Observable<any> {
    return this._http.get(`${environment.baseUrl}/api/v1/wishlist`)

  }

  
}
