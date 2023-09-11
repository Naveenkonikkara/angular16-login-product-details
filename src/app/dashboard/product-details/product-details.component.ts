import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Event as NavigationEvent,
  Router,
} from '@angular/router';
import { ProductsService } from '../products.service';
import { Product, ProductList } from '../../../model/product-list';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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
  isDirty$!: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.productForm = this.formBuilder.group({
      id: [''],
      manufacturing: [''],
      name: [''],
      price: [''],
      type: [''],
      units: [''],
    });

    // this.productValueChange();
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

    this.isDirty$ = this.productForm.valueChanges.pipe(
      this.productService.dirtyCheck(this.productService.selectedProduct$)
    );
    this.productService.selectedProduct$
      .pipe(untilDestroyed(this))
      .subscribe((state) => this.productForm.patchValue(state));
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
      // this.productService
      //   .updateProduct(this.productForm.value.id, this.productForm.value)
      //   .subscribe((data) => {
      //     console.log('Update: ' + data);
      //   });

      this.productService
        .updateProductList(this.productForm.value.id, this.productForm.value)
        .subscribe((data) => {
          console.log('Update: ' + data);
          this.router.navigate(['/products/']);
        });

      this.productService.product$.next(this.productForm.value);
    }
  }

  // productValueChange() {
  //   this.productForm.valueChanges.subscribe((change) => this.productForm);
  // }
}
