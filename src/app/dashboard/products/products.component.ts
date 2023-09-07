import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';

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
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {}
}
