import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { MarketComponent } from './market/market.component';
import { UserComponent } from './user/user.component';

export const DashboardRoutes: Routes = [{
  path: '',
  children: [{
    path: 'markets',
    component: MarketComponent
  }, {
    path: 'categories',
    component: CategoryComponent
  }, {
    path: 'products',
    component: ProductComponent
  }, {
    path: 'users',
    component: UserComponent
  }]
}];
