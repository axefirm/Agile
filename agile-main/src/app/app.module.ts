import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Header1Component } from './component/headers/header1/header1.component';
import { Header2Component } from './component/headers/header2/header2.component';
import { Header3Component } from './component/headers/header3/header3.component';
import { Footer1Component } from './component/footer/footer1/footer1.component';
import { Footer2Component } from './component/footer/footer2/footer2.component';
import { Carousel1Component } from './component/carousel/carousel1/carousel1.component';
import { Blog1Component } from './component/blog/blog1/blog1.component';
import { NewProduct1Component } from './component/new-product/new-product1/new-product1.component';
import { Card1Component } from './component/cards/card1/card1.component';
import { Banner1Component } from './component/banners/banner1/banner1.component';
import { Feature1Component } from './component/features/feature1/feature1.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { SaledProductComponent } from './pages/saled-product/saled-product.component';
import { ProductsComponent } from './pages/products/products.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetail1Component } from './component/product-detail/product-detail1/product-detail1.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { Login1Component } from './component/logins/login1/login1.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    Header1Component,
    Header2Component,
    Header3Component,
    Footer1Component,
    Footer2Component,
    Carousel1Component,
    Blog1Component,
    NewProduct1Component,
    Card1Component,
    Banner1Component,
    Feature1Component,
    HomeComponent,
    AboutComponent,
    SaledProductComponent,
    ProductsComponent,
    BlogsComponent,
    ContactComponent,
    ProductDetail1Component,
    ProductDetailComponent,
    Login1Component,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('257979695974220')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
