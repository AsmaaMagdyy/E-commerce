import { Component, inject, OnInit } from '@angular/core';
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
  wishListItems:IProduct[]=[]
  private readonly _WishlistService=inject(WishlistService);
  private readonly toastr=inject(ToastrService);
  private readonly _CartService=inject(CartService);
  wishlistArr: string[]=[];


  ngOnInit(): void {
    this.getAllItemsInWishList()
  }
  getAllItemsInWishList():void{
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        console.log(res.data);
        this.wishListItems=res.data;
        
      },
    })
  }

  removeFromWishlist(productId:string):void{
    this._WishlistService.removeProductFromWishlist(productId).subscribe({
      next:(res)=>{
        if (res.status == 'success') {
          this.toastr.error('Products Removed Successfuly From Wishlist');
          this.getAllItemsInWishList()
          this.wishlistArr =[...res.data]
          localStorage.setItem('wishlist',JSON.stringify(this.wishlistArr))
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
