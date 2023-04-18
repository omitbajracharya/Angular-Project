import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { HeaderComponent } from '../components/header/header.component';


@NgModule({
  declarations: [
    HomepageComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomepageModule { }
