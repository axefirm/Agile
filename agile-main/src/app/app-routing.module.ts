import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductDetail1Component } from './component/product-detail/product-detail1/product-detail1.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsComponent } from './pages/products/products.component';
import { SaledProductComponent } from './pages/saled-product/saled-product.component';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'blogs', component: BlogsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'saled-products', component: SaledProductComponent },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: 'login', component: LoginComponent },

  ],
    { enableTracing: false, scrollPositionRestoration: 'enabled' })], // useHash: true
  exports: [RouterModule]
})
export class AppRoutingModule { }
