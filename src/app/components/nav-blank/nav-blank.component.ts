import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { CartService } from '../../core/services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {
private readonly _CartService =inject(CartService)
private readonly _WishlistService =inject(WishlistService)
private readonly _MytranslateService =inject(MytranslateService)
 readonly _TranslateService =inject(TranslateService)


constructor(public readonly _AuthenticationService: AuthenticationService) { }
cartItems:Signal<number>=computed(()=> this._CartService.numOfCartItems())
wishListItems:Signal<number>=computed(()=> this._WishlistService.wishlistItemsNum())



changeLang(lang:string):void{
  this._MytranslateService.changeLang(lang);

}

}
