import { Component } from '@angular/core';
import { Product } from 'src/interfaces/product';
import { ApiService } from 'src/shared/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  public products:Array<Product>=[];  
  constructor(private _apiservice:ApiService){}

ngOnInit(): void {
  this.getData()
}

getData(){
  this._apiservice.getProducts().subscribe((data:Array<Product>)=>{
    this.products=data;
    console.log(data);
  })
}

addToCart(addedProduct:any){
  console.log(addedProduct);
}
}
