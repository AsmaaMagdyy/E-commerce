import { Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ProuductsService } from '../../core/services/prouducts.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe, DatePipe, isPlatformBrowser, NgClass, NgStyle } from '@angular/common';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, NgStyle, NgClass, CurrencyPipe, DatePipe, TermTextPipe, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _ProuductsService = inject(ProuductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly toastr = inject(ToastrService);
  private readonly _CartService = inject(CartService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)


  productyList:WritableSignal<IProduct[]> =signal([]);
  categoriesList:WritableSignal<Icategory[]> = signal([])
  inWishlist!:WritableSignal<boolean>

  wishlistArr:WritableSignal<string[]> = signal([])

  text:WritableSignal<string> = signal('');


  getAllProductSub!: Subscription;
  getAllCategoriesSub!: Subscription;
  addProductToWishlistSub!: Subscription;
  removeProductFromWishlistSub!: Subscription;
  addToCartSub!: Subscription;

  customOptionsMain: OwlOptions = {
    loop: true,
    rtl:true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  customOptionsCat: OwlOptions = {
    loop: true,
    rtl:true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navText: ['', ''],
    items: 1,
    nav: true
  }

  ngOnInit(): void {
    this.getAllCategoriesSub=this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.categoriesList.set(res.data);

      },
      error: (err) => {
        console.log(err);

      }
    })

    this.getAllProductSub = this._ProuductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productyList.set(res.data);

      }
    })
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.wishlistArr.set(JSON.parse(localStorage.getItem('wishlist')!))
    }
  }

 

  toggleOnWishlist(product: IProduct) {
    if (this.wishlistArr()?.includes(product.id)) {
      product.onWishlist = false;
      this.removeFromWishList(product);

    } else {
      product.onWishlist = true;
      this.addToWishList(product);
    }
  }


  addToWishList(product: IProduct): void {
    console.log(product);

    this.addProductToWishlistSub=this._WishlistService.addProductToWishlist(product.id).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          console.log(res);
          
          this.toastr.success(res.message);
          this.wishlistArr.set([...res.data]);
          localStorage.setItem('wishlist', JSON.stringify(this.wishlistArr()));
          this._WishlistService.wishlistItemsNum.set(res.data.length);
          // console.log(this.wishlistArr);

        }
      }
    })

  }
  removeFromWishList(product: IProduct): void {
    this.removeProductFromWishlistSub=this._WishlistService.removeProductFromWishlist(product.id).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this.toastr.error('Products Removed Successfuly From Wishlist');
          this.wishlistArr.set([...res.data]);
          localStorage.setItem('wishlist', JSON.stringify(this.wishlistArr()));
          this._WishlistService.wishlistItemsNum.set(res.data.length);


          // console.log(this.wishlistArr);

        }
      }
    })

  }

  existInWishlist(product: IProduct): boolean {
    if (this.wishlistArr()?.includes(product.id)) {
      return true;
    } else {
      return false;
    }
  }

  addProductToCart(productId: string): void {
   this.addToCartSub= this._CartService.addToCart(productId).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this.toastr.success(res.message);
          this._CartService.numOfCartItems.set(res.numOfCartItems);

        }

      }
    })
  }



  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe();
    this.getAllCategoriesSub?.unsubscribe();
    this.removeProductFromWishlistSub?.unsubscribe();
    this.addProductToWishlistSub?.unsubscribe();
    this.addToCartSub?.unsubscribe();
  }
}
