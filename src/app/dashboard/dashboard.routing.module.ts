import { NgModule } from '@angular/core';
import { Routes, RouterModule, mapToCanDeactivate } from '@angular/router';
import { DirtyCheckGuard } from '../helpers/dirty-check.guard';
import { ProductGuard } from '../helpers/product.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [ProductGuard],
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    canDeactivate: mapToCanDeactivate([DirtyCheckGuard]),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
