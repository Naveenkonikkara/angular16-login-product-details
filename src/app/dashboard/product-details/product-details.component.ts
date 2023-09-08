import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId!: any;
  selectedProduct!: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
    });
    console.log(this.productId);
    this.productService.getProduct().subscribe((data) => {
      this.selectedProduct = data;
      console.log(this.selectedProduct);
    });
  }
}
