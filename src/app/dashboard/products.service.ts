import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ProductList } from '../../model/product-list';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private product$ = new BehaviorSubject<any>({});
  selectedProduct$ = this.product$.asObservable();

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ProductList> {
    return this.http.get<ProductList>('../../assets/JSON/products.json');
  }

  setProduct(product: any) {
    this.product$.next(product);
  }

  getProduct(): Observable<any> {
    return this.selectedProduct$;
  }
}
