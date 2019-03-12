import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './usuarios/user.component';
import { CategoryComponent } from './category/category.component';

export const DashboardRoutes: Routes = [{
  path: '',
  children: [{
    path: 'products',
    component: ProductComponent
  }, {
    path: 'users',
    component: UserComponent
  }, {
    path: 'categories',
    component: CategoryComponent
  }]
}];
