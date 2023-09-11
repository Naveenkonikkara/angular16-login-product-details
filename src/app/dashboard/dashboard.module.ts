import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsService } from './products.service';
import { ReactiveFormsModule } from '@angular/forms';
import { fakeBackendProvider } from '../helpers/fake-backend-interceptor';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  imports: [
    DashboardRoutingModule,
    HttpClientModule,
    CommonModule,
    AgGridModule,
    ReactiveFormsModule,
    NzModalModule,
  ],
  declarations: [ProductsComponent, ProductDetailsComponent],
  providers: [ProductsService, fakeBackendProvider],
})
export class DashboardModule {}
