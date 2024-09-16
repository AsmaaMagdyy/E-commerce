import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProuductsService } from '../../core/services/prouducts.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProuductsService = inject(ProuductsService);
  private readonly _CartService = inject(CartService);
  private readonly toastr=inject(ToastrService);

  
  detailsProduct:IProduct |null =null;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }
  
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        // console.log(p.get('id'));
        
       let idProduct = p.get('id');

       this._ProuductsService.getSpecificProducts(idProduct).subscribe({
        next:(res)=>{
          console.log(res.data);
          
          this.detailsProduct = res.data;
          
        }
       })
        

      }
    })
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
}
