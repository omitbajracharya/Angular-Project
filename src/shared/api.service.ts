import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
 * Post the data.
 * @param data - New product to be added.
 * @returns 
 */
  public postProduct(data : Product):Observable<Product>{
    return this.http.post<Product>("https://fakestoreapi.com/products", data);
  }

  /**
 * Get all product from api. 
 * @returns 
 */
  public getProducts():Observable<Product[]>{
    return this.http.get<Product[]>("https://fakestoreapi.com/products");
  }

  /**
   * 
   * @param data - New data to update old one.
   * @param id - Update using this id
   * @returns 
   */
  public updateProduct(data :Product, id: number):Observable<Product>{
    return this.http.put<Product>(`https://fakestoreapi.com/products/${id}`, data);
  }

  /**
   * Delete the selected Product using id.
   * @param id 
   * @returns 
   */
  public deleteProduct(id : number):Observable<Product>{
    return this.http.delete<any>(`https://fakestoreapi.com/products/${id}`); 
  }
}
