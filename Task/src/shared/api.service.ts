import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
/**
 * 
 * @param data - New product to be added.
 * @returns 
 */
  public postProduct(data : Product){
    return this.http.post<Product>("https://fakestoreapi.com/products", data);
  }

  public getProducts(){
    return this.http.get<Array<Product>>("https://fakestoreapi.com/products");
  }

  public updateProduct(data :any, id: number){
    return this.http.put<any>(`https://fakestoreapi.com/products/${id}`, data);
  }

  public deleteProduct(id : number){
    return this.http.delete<any>(`https://fakestoreapi.com/products/${id}`); 
  }
}
