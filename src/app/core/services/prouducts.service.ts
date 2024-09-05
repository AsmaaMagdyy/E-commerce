import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProuductsService {
  private readonly _HttpClient = inject(HttpClient);
  
  constructor() { }

  getAllProducts():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`)
  }

  getSpecificProducts(id:string | null):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }

}
