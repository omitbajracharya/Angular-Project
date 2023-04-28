import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninPageComponent } from '../components/signin-page/signin-page.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { SharedHeaderModule } from 'src/modules/shared-header.module';
import { TooltipModule } from 'primeng/tooltip';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SigninPageComponent,
    PageNotFoundComponent
  ],
  imports: [
    SharedHeaderModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    ToastModule,
    TooltipModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
