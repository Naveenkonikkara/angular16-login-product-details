import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product, ProductList } from '../../model/product-list';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private product$ = new BehaviorSubject<any>({});
  selectedProduct$ = this.product$.asObservable();
  private _jsonURL = '../../assets/JSON/products.json';
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ProductList> {
    return this.http.get<ProductList>(this._jsonURL);
  }

  setProduct(product: any) {
    this.product$.next(product);
  }

  getProduct(): Observable<any> {
    return this.selectedProduct$;
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this._jsonURL, product);
  }
}
