import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Product } from 'src/interfaces/product';
import { CartService } from 'src/shared/cart.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent {
  public cardDetail: string = '';
  public expiry: string = '';
  public subTotal: number = 0;
  public total: number = 0;
  public addedProductInCard: Array<Product> = [];

  //Data collect and calculate to display.
  constructor(private _cartService: CartService, private router: Router, private messageService: MessageService) {
    this._cartService.productCart.subscribe((data: Array<Product> | []) => {
      this.addedProductInCard = data;
      this.addedProductInCard.forEach((data: Product) => {
        this.subTotal = this.subTotal + data.price;
      })
      this.total = this.subTotal + 13 * this.subTotal / 100;
      if (this.total == 0) {
        this.router.navigate(['']);
      }
    })
  }

  /**
   * Redirect to Home page after payment
   */
  public checkout() {
    if(this.cardDetail.length != 0)
    {
      console.log("------------",this.cardDetail,"---------------")
    console.log("Payment:");
    console.log("Product=>", this.addedProductInCard);
    console.log("Subtotal=>", this.subTotal);
    console.log("Total=>", this.total);
    console.log("Card Detail=>", this.cardDetail);
    console.log("Expiry=>", this.expiry);
    this.messageService.add({ severity: 'success', summary: 'Checkout', detail: 'Checkout from payment' });
    setTimeout(()=>this.router.navigate(['home/home-page']),1000);
  }
  else{
    this.messageService.add({ severity: 'info', summary: 'Detail Please', detail: 'Please Enter Card detail and expiry..' });
  }
}

  /**
   * Redirect to Cart Page if cancel
   */
  public cancelCheckout() {
    this.router.navigate(['home/cart']);
  }
}
