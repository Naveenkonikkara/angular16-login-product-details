import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellClickedEvent,
  ColDef,
  GridReadyEvent,
  GridOptions,
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';
import { Product, ProductList } from '../../../model/product-list';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productList!: ProductList;

  public columnDefs: ColDef[] = [
    {
      field: 'id',
      cellDataType: 'number',
    },
    {
      field: 'manufacturing',
    },
    {
      field: 'name',
    },
    {
      field: 'price',
      cellDataType: 'number',
    },
    {
      field: 'type',
    },
    {
      field: 'units',
      cellDataType: 'number',
    },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.giveAllProducts();
  }

  giveAllProducts() {
    // this.productService.getAllProducts().subscribe((res: ProductList) => {
    //   console.log(res);
    //   this.productList = res;
    // });

    this.productList = this.productService.getProductList();
  }

  onGridReady(params: GridReadyEvent) {
    this.giveAllProducts();
  }

  onCellClicked(cell: CellClickedEvent): void {
    this.router.navigateByUrl('/product/' + cell.data.id);
    this.productService.setProduct(cell.data);
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
