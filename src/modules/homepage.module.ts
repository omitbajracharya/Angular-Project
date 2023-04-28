import { NgModule } from '@angular/core';
import { HomepageComponent } from '../components/homepage/homepage.component';

import { TableModule } from 'primeng/table';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from 'src/components/cart/cart.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DetailPageComponent } from '../components/detail-page/detail-page.component';
import { SplitterModule } from 'primeng/splitter';
import { CardModule } from 'primeng/card';
import { PaymentPageComponent } from '../components/payment-page/payment-page.component';
import { SharedHeaderModule } from './shared-header.module';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/home-page',
    pathMatch: 'full'
  },
  {
    path: 'home-page',
    component: HomepageComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'detail-page',
    component: DetailPageComponent
  },
  {
    path: 'payment',
    component: PaymentPageComponent
  }
];

@NgModule({
  declarations: [
    HomepageComponent,
    CartComponent,
    DetailPageComponent,
    PaymentPageComponent
  ],
  imports: [
    CommonModule,
    SharedHeaderModule,
    TableModule,
    RouterModule.forChild(routes),
    ButtonModule,
    ToastModule,
    FormsModule,
    InputTextModule,
    SplitterModule,
    CardModule
  ],
  exports: [RouterModule],
  providers: [MessageService]
})
export class HomepageModule {
  constructor() {
    console.log("home page module loads...")
  }
}
