import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/interfaces/product';
import { ApiService } from 'src/shared/api.service';
import { CartService } from 'src/shared/cart.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {
  public productList: Array<Product> = [];
  public loading: boolean = false;
  private searchData: Array<Product> = [];
  private products: Array<Product> = [];
  private idListInCart: Array<number> = [];
  private addedProductInCard: Array<Product> = [];
  private removeSubscription: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _apiService: ApiService,
    private _cartService: CartService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._cartService.productCart.subscribe((data: Array<Product> | []) => {
      this.addedProductInCard = data;
      this.idListInCart = this.addedProductInCard.map((data: Product) => data.id);
    })
    this.getData()
  }

  /**
   * Get the data from rest api 
   */
  private getData() {
    this._apiService.getProducts().pipe(takeUntil(this.removeSubscription)).subscribe((data: Array<Product>) => {
      this.products = data;
      this.productList = this.products;
    })
  }

  /**
   * Add the product to cart
   * @param addedProduct - Selected product added on card
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

  public searchProduct(searchData: string) {
    this.searchData = this.products.filter(item => item.title.toLowerCase().indexOf(searchData.toLowerCase()) > -1);
    if (this.searchData.length == 0) {
      this.productList = this.products;
    }
    else {
      this.productList = this.searchData;
    }

  }

  /**
   * Set that product to subject detailProduct and navvigate.
   * @param product - Selected product from home page for detailpage.
   */
  public redirectToDetailPage(product: Product) {
    this._cartService.detailProduct.next(product);
    this.router.navigate(['home/detail-page/']);
  }

  /**
   * Remove all subscription when not using it.
   */
  ngOnDestroy(): void {
    this.removeSubscription.next(true);
    this.removeSubscription.complete();
  }
}

