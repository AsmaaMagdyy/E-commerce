import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  private readonly _WishlistService=inject(WishlistService);
  private readonly toastr=inject(ToastrService);
  private readonly _CartService=inject(CartService);


  wishListItems:WritableSignal<IProduct[]>=signal([]);
  wishlistArr:WritableSignal<string[]>=signal([]);


  ngOnInit(): void {
    this.getAllItemsInWishList()
  }
  getAllItemsInWishList():void{
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        console.log(res.data);
        this.wishListItems.set(res.data);
        
      },
    })
  }

  removeFromWishlist(productId:string):void{
    this._WishlistService.removeProductFromWishlist(productId).subscribe({
      next:(res)=>{
        if (res.status == 'success') {
          this.toastr.error('Products Removed Successfuly From Wishlist');
          this.getAllItemsInWishList()
          this.wishlistArr.set([...res.data])
          localStorage.setItem('wishlist',JSON.stringify(this.wishlistArr()))
        }
      }
    })
  }

  addProductToCart(productId:string):void{
    this._CartService.addToCart(productId).subscribe({
      next:(res)=>{
        if (res.status == 'success') {
          this.toastr.success(res.message);
          this._CartService.numOfCartItems.set(res.numOfCartItems);
          this.removeFromWishlist(productId);
        }
        
      }
    })
  }


}
