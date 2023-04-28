import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from 'src/components/login-page/login-page.component';
import { PageNotFoundComponent } from 'src/components/page-not-found/page-not-found.component';
import { SigninPageComponent } from 'src/components/signin-page/signin-page.component';
import { AuthForAlreadyLoginGuard } from 'src/guard/auth-for-already-login.guard';
import { AuthGuard } from 'src/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path:'sign-in',
    component: SigninPageComponent
  },
  {
    path:'login',
    component: LoginPageComponent
    ,canActivate:[AuthForAlreadyLoginGuard]
  },
  {
    path:'home',
    loadChildren: () => import('../modules/homepage.module').then(m => m.HomepageModule)
    ,canActivate:[AuthGuard]
  },
  { 
    path: '**', 
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
