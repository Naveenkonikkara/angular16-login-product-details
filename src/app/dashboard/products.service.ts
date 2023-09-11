import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
} from 'rxjs';
import { Product, ProductList } from '../../model/product-list';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public product$ = new BehaviorSubject<any>({});
  selectedProduct$ = this.product$.asObservable();
  private _jsonURL = '../../assets/JSON/products.json/';
  private productList = [
    {
      id: 0,
      name: 'Fevicol',
      type: 'adhesive',
      price: 125.1,
      units: 10,
      manufacturing: '21/05/22',
    },
    {
      id: 1,
      name: 'Colgate',
      type: 'paste',
      price: 25.0,
      units: 1000,
      manufacturing: '12/01/21',
    },
    {
      id: 2,
      name: 'Samsung',
      type: 'mobile',
      price: 29999,
      units: 100,
      manufacturing: '21/05/22',
    },
    {
      id: 3,
      name: 'Rotomac',
      type: 'pen',
      price: 20.0,
      units: 5,
      manufacturing: '31/01/22',
    },
    {
      id: 4,
      name: 'Dell',
      type: 'laptop',
      price: 100000,
      units: 5,
      manufacturing: '01/01/22',
    },
    {
      id: 5,
      name: 'Classmate',
      type: 'notebook',
      price: 30.5,
      units: 33,
      manufacturing: '21/05/22',
    },
    {
      id: 6,
      name: 'Fevikiwk',
      type: 'adhesive',
      price: 25.8,
      units: 78,
      manufacturing: '21/08/22',
    },
    {
      id: 7,
      name: 'Close Up',
      type: 'paste',
      price: 125.0,
      units: 900,
      manufacturing: '18/01/21',
    },
    {
      id: 8,
      name: 'One Plus',
      type: 'mobile',
      price: 35000,
      units: 10,
      manufacturing: '21/05/22',
    },
    {
      id: 9,
      name: 'Reynolds',
      type: 'pen',
      price: 10.0,
      units: 500,
      manufacturing: '31/01/22',
    },
    {
      id: 10,
      name: 'Lenovo',
      type: 'laptop',
      price: 79999,
      units: 10,
      manufacturing: '01/01/22',
    },
  ];
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ProductList> {
    return this.http.get<ProductList>(this._jsonURL);
  }

  getProductList() {
    return this.productList;
  }

  updateProductList(id: string, product: Product): Observable<ProductList> {
    this.productList.forEach((item: any, index) => {
      if (item.id === id) {
        this.productList[index] = product;
      }
    });
    return of(this.productList);
  }

  setProduct(product: any) {
    this.product$.next(product);
  }

  getProduct(): Observable<any> {
    return this.selectedProduct$;
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(this._jsonURL + id, product);
  }

  dirtyCheck<U>(source: Observable<U>) {
    return function <T>(valueChanges: Observable<T>): Observable<boolean> {
      const isDirty$ = combineLatest([source, valueChanges]).pipe(
        debounceTime(300),
        map(([a, b]) => isEqual(a, b) === false),
        shareReplay({ bufferSize: 1, refCount: true })
      );

      return isDirty$;
    };
  }
}

function isEqual(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b);
}
