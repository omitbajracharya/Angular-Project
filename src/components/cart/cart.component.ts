import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Product } from 'src/interfaces/product';
import { CartService } from 'src/shared/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  public products:Array<Product>=[];

  constructor(
    private _cartService:CartService,
    private messageService:MessageService,
    private router:Router
    ){}
  
    /**
     * Obtain the cart products using cartService.
     */
  ngOnInit(): void {
    this._cartService.productCart.subscribe((data:Array<Product>)=>{
      this.products=data;
    })
  }

  /**
   * Remove particular id's product from cart.
   * @param pid - Product id to be removed 
   */
  public removeFromCart(pid:number){
    this.products=this.products.filter((data:Product)=> data.id!=pid);
    this._cartService.productCart.next(this.products);
    this._cartService.count.next(this.products.length);
    this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Product is deleted successfully from card.' });
  }

  /**
   * Just redirect to payment url
   */
  public paymentProcess(){
    this.router.navigate(['home/payment'])
  }
}
