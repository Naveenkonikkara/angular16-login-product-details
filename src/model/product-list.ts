export interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  units: number;
  manufacturing: string;
}

export interface ProductList extends Array<Product> {}
