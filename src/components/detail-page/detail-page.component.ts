import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/interfaces/product';
import { CartService } from 'src/shared/cart.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  public product!: Product;
  private idListInCart: Array<number> = [];
  private addedProductInCard: Array<Product> = [];
  
  /**
   * Set the detail product value if present.
   * If detail page url is directly hit, navigate to home page.
  */
 constructor(private _cartService: CartService, private router: Router, private messageService: MessageService,private activatedRoute:ActivatedRoute) {
  const pid = this.activatedRoute.snapshot.paramMap.get('id');
   this._cartService.detailProduct.subscribe((data: Product) => {
     if (data.category === '')   //just a initialize value - navigate to homepage 
     this.router.navigate([''])
     this.product = data
    });
  }

  /**
   * productCart -  product list in cart
   * idListInCart - id list for checking already in cart
   */
  ngOnInit(): void {
    this._cartService.productCart.subscribe((data: Array<Product> | []) => {
      this.addedProductInCard = data;
      this.idListInCart = this.addedProductInCard.map((data: Product) => data.id);
    }) 
  }

  /**
   * Add selected product to cart sitting in detail page.
   * @param addedProduct 
   */
  public addToCart(addedProduct: Product) {
    if (!(this.idListInCart.includes(addedProduct.id))) {
      this.addedProductInCard = [...this.addedProductInCard, addedProduct];
      this.idListInCart = [...this.idListInCart, addedProduct.id];
      this._cartService.count.next(this.addedProductInCard.length);
      this._cartService.productCart.next(this.addedProductInCard);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is added in card.' });
    }
    else {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Product is already added...' });
    }
  }
}
