import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductGuard } from './helpers/product.guard';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

const dashboardModule = () =>
  import('./dashboard/dashboard.module').then((m) => m.DashboardModule);

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'products',
    loadChildren: dashboardModule,
    canActivate: [ProductGuard],
  },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
