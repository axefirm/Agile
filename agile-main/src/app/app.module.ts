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

@NgModule({
  declarations: [
    AppComponent,
    Header1Component,
    Header2Component,
    Header3Component,
    Footer1Component,
    Footer2Component,
    Carousel1Component,
    Blog1Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
