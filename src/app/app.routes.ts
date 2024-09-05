import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CheckoutCashComponent } from './components/checkout-cash/checkout-cash.component';

export const routes: Routes = [
    {path:'',component:AuthLayoutComponent,canActivate:[logedGuard],children:[
        {path:'',redirectTo:'login',pathMatch:'full'},
        {path:'login',component:LoginComponent,title:'login'},
        {path:'register',component:RegisterComponent,title:'register'},
        {path:'forget',component:ForgetPasswordComponent,title:'forget'}
    ]},
    {path:'',component:BlankLayoutComponent,canActivate:[authGuard] ,children:[
        {path:'',redirectTo:'home',pathMatch:'full'},
        {path:'home',component:HomeComponent,title:'home'},
        {path:'products',component:ProductComponent,title:'products'},
        {path:'cart',component:CartComponent,title:'cart'},
        {path:'brands',component:BrandsComponent,title:'brands'},
        {path:'categories',component:CategoriesComponent,title:'categories'},
        {path:'details/:id',component:DetailsComponent,title:'details'},
        {path:'wishlist',component:WishlistComponent,title:'wishlist'},
        {path:'allorders',component:AllordersComponent,title:'allorders'},
        {path:'orders/:id',component:OrdersComponent,title:'orders'},
        {path:'cod/:id',component:CheckoutCashComponent,title:'checkout'}
    ]},
    {path:'**',component:NotfoundComponent}
];
