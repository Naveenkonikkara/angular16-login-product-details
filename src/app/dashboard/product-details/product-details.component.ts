import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product, ProductList } from '../../../model/product-list';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId!: any;
  selectedProduct!: Product;
  productHeaders!: any;
  editProduct: boolean = false;
  productForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      manufacturing: [''],
      name: [''],
      price: [''],
      type: [''],
      units: [''],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
    });
    console.log(this.productId);
    this.productService.getProduct().subscribe((data) => {
      this.selectedProduct = data;
      this.productHeaders = Object.keys(this.selectedProduct);
      console.log(this.selectedProduct);
    });
  }

  getProductValue(key: string) {
    return this.selectedProduct[key as keyof Product];
  }

  setProductForm() {
    this.productHeaders.forEach((header: any) => {
      this.productForm.get(header)?.setValue(this.getProductValue(header));
    });
  }

  onEdit() {
    this.editProduct = true;
    this.setProductForm();
  }

  onSave() {
    if (this.productForm.valid) {
      console.log('Product Value Changed: ' + this.productForm.value);
    }
  }
}
