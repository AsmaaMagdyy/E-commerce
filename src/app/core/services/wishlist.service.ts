import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {


  constructor(private _http: HttpClient) { }

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
