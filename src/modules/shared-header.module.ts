import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/components/header/header.component';
const routes: Routes = []

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [HeaderComponent]
})
export class SharedHeaderModule { }
