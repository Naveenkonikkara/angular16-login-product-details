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
    },
    {
      field: 'manufacturing',
    },
    {
      field: 'name',
    },
    {
      field: 'price',
    },
    {
      field: 'type',
    },
    {
      field: 'units',
    },
    // {
    //   field: 'make',
    // },
    // {
    //   field: 'model',
    // },
    // {
    //   field: 'price',
    // },
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  // Data that gets displayed in the grid
  // public rowData$!: Observable<ProductList>;

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
    this.productService.getAllProducts().subscribe((res: ProductList) => {
      console.log(res);
      this.productList = res;
    });
  }

  // onGridReady(params: GridReadyEvent) {
  //   this.rowData$ = this.http.get<any[]>(
  //     'https://www.ag-grid.com/example-assets/row-data.json'
  //   );
  // }

  onCellClicked(cell: CellClickedEvent): void {
    this.router.navigateByUrl('/product/' + cell.value);
    // this.router.navigateByUrl('/product/' + cell.value, { state: cell.data });
    this.productService.setProduct(cell.data);
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
