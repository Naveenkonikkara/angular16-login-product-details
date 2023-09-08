import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsService } from './products.service';

@NgModule({
  imports: [
    DashboardRoutingModule,
    HttpClientModule,
    CommonModule,
    AgGridModule,
  ],
  declarations: [ProductsComponent, ProductDetailsComponent],
  providers: [ProductsService],
})
export class DashboardModule {}
