import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
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
  
  
  private readonly _ProuductsService=inject(ProuductsService);
  private readonly _WishlistService=inject(WishlistService);
  private readonly toastr=inject(ToastrService);
  private readonly _CartService=inject(CartService);
  private readonly _PLATFORM_ID=inject(PLATFORM_ID)

  productyList:WritableSignal<IProduct[]>=signal([]);
  text:WritableSignal<string>=signal('');
  wishlistArr:WritableSignal<string[]>=signal([])

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts():void{
    this._ProuductsService.getAllProducts().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.productyList.set(res.data);
        
        
      }
    })

    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.wishlistArr.set(JSON.parse(localStorage.getItem('wishlist')!))
      }
  }
  addProductToCart(productId:string):void{
    this._CartService.addToCart(productId).subscribe({
      next:(res)=>{
        if (res.status == 'success') {
          this.toastr.success(res.message);
          this._CartService.numOfCartItems.set(res.numOfCartItems);

        }
        
      }
    })
  }

  toggleOnWishlist(product:IProduct){
    if (this.wishlistArr()?.includes(product.id)) {
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
          this.wishlistArr.set([...res.data])
          localStorage.setItem('wishlist',JSON.stringify(this.wishlistArr()))
        }
      }
    })

  }
  removeFromWishList(product:IProduct):void{
    this._WishlistService.removeProductFromWishlist(product.id).subscribe({
      next:(res)=>{
        if (res.status == 'success') {
          this.toastr.error('Products Removed Successfuly From Wishlist');
          this.wishlistArr.set([...res.data])
          localStorage.setItem('wishlist',JSON.stringify(this.wishlistArr()))
        }
      }
    })

  }
  existInWishlist(product: IProduct): boolean {
    if (this.wishlistArr().includes(product.id)) {
      return true;
    } else {
      return false;
    }
  }

}
