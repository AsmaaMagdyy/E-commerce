import { Routes } from '@angular/router';
import { AllordersComponent } from './components/allorders/allorders.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CheckoutCashComponent } from './components/checkout-cash/checkout-cash.component';
import { DetailsComponent } from './components/details/details.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UpdateAccountComponent } from './components/update-account/update-account.component';
import { UpdatePassworddComponent } from './components/update-passwordd/update-passwordd.component';
import { HomeSettingsComponent } from './components/home-settings/home-settings.component';

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
        {path:'cod/:id',component:CheckoutCashComponent,title:'checkout'},
        {path:'settings',component:SettingsComponent,title:'settings' ,children:[
            {path:'',redirectTo:'homesettings',pathMatch:'full'},
            {path:'homesettings',component:HomeSettingsComponent,title:'homesettings'},
            {path:'updateaccount',component:UpdateAccountComponent,title:'updateaccount'},
            {path:'updatepass',component:UpdatePassworddComponent,title:'updatepassword'},

        ]}
    ]},
    {path:'**',loadComponent: () => import('./components/notfound/notfound.component').then((c) => c.NotfoundComponent) }
];
