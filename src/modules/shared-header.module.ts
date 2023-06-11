import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from 'src/components/header/header.component';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
const routes: Routes = []

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    RouterModule.forChild(routes),
    DropdownModule,
    CommonModule
  ],
  exports: [HeaderComponent]
})
export class SharedHeaderModule { }
