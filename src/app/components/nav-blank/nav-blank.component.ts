import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { CartService } from '../../core/services/cart.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit{
private readonly _CartService =inject(CartService)
constructor(public readonly _AuthenticationService: AuthenticationService) { }
cartItems:number=0

ngOnInit(): void {
 this._CartService.numOfCartItems.subscribe({
  next: (res) => {
    this.cartItems=res;
  }
 })
}

}
