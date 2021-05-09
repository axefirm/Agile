import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { AddOrderComponent } from './pages/add-order/add-order.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditShopComponent } from './pages/edit-shop/edit-shop.component';
import { EnrollMerchComponent } from './pages/enroll-merch/enroll-merch.component';
import { LoginComponent } from './pages/login/login.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { SettingsComponent } from './pages/settings/settings.component';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
    { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'create', component: EnrollMerchComponent },
    { path: 'add-product', component: AddProductComponent },
    { path: 'add-order', component: AddOrderComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'edit-shop', component: EditShopComponent},
  ],
    { enableTracing: false, scrollPositionRestoration: 'enabled' })], // useHash: true
  exports: [RouterModule]
})
export class AppRoutingModule { }
