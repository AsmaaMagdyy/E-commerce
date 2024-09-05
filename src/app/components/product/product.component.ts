import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct';
import { ProuductsService } from '../../core/services/prouducts.service';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, isPlatformBrowser, NgClass, NgStyle } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink,NgStyle, NgClass ,CurrencyPipe,FormsModule, SearchPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  productyList:IProduct[]=[];
  
  private readonly _ProuductsService=inject(ProuductsService);
  private readonly _WishlistService=inject(WishlistService);
  private readonly toastr=inject(ToastrService);
  private readonly _CartService=inject(CartService);
  private readonly _PLATFORM_ID=inject(PLATFORM_ID)


  text:string=''
  wishlistArr:string[]=[]

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts():void{
    this._ProuductsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.productyList=res.data;
        
        
      }
    })

    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.wishlistArr= JSON.parse(localStorage.getItem('wishlist')!)
      }
  }
  addProductToCart(productId:string):void{
    this._CartService.addToCart(productId).subscribe({
      next:(res)=>{
        if (res.status == 'success') {
          this.toastr.success(res.message);
          this._CartService.numOfCartItems.next(res.numOfCartItems);

        }
        
      }
    })
  }

  toggleOnWishlist(product:IProduct){
    if (this.wishlistArr?.includes(product.id)) {
      product.onWishlist = false;
      this.removeFromWishList(product);

    } else {
      product.onWishlist = true;
      this.addToWishList(product);
    }
  }


  addToWishList(product:IProduct):void{
    console.log(product);
  
    this._WishlistService.addProductToWishlist(product.id).subscribe({
      next:(res)=>{
        if (res.status == 'success') {
          this.toastr.success(res.message);
          this.wishlistArr =[...res.data]
          localStorage.setItem('wishlist',JSON.stringify(this.wishlistArr))
        }
      }
    })

  }
  removeFromWishList(product:IProduct):void{
    this._WishlistService.removeProductFromWishlist(product.id).subscribe({
      next:(res)=>{
        if (res.status == 'success') {
          this.toastr.success('Products Removed Successfuly From Wishlist');
          this.wishlistArr =[...res.data]
          localStorage.setItem('wishlist',JSON.stringify(this.wishlistArr))
        }
      }
    })

  }
  existInWishlist(product: IProduct): boolean {
    if (this.wishlistArr.includes(product.id)) {
      return true;
    } else {
      return false;
    }
  }

}
