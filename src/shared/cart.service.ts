import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from 'src/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public count = new BehaviorSubject(0);
  public productCart=new BehaviorSubject<Array<Product>>([]);
  public detailProduct=new BehaviorSubject<Product>({id:0,title:'',price:0,description:'',category:'',rating:{ "rate":0, "count":0 },image:''});
  // public 
  constructor() { }
}
