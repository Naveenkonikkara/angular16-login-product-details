import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  columnDefs = [
    {
      headerName: 'Make',
      field: 'make',
      sortable: true,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Price',
      field: 'price',
      sortable: true,
      filter: 'agNumberColumnFilter',
      cellStyle: { 'text-align': 'right' },
    },
  ];

  rowData = [
    { make: 'Toyota', price: 35000 },
    { make: 'Ford', price: 32000 },
    { make: 'Porsche', price: 72000 },
  ];
  constructor() {}

  ngOnInit() {}
}
