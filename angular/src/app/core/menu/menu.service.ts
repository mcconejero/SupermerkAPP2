import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'markets',
    name: 'SUPERMARKETS',
    type: 'link',
    icon: 'supervisor_account'
  },
  {
    state: 'categories',
    name: 'CATEGORIES',
    type: 'link',
    icon: 'category'
  },
  {
    state: 'products',
    name: 'PRODUCTS',
    type: 'link',
    icon: 'dns'
  },
  {
    state: 'users',
    name: 'USERS',
    type: 'link',
    icon: 'supervisor_account'
  }
];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu) {
    MENUITEMS.push(menu);
  }
}
