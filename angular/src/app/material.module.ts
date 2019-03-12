import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatListModule, MatSidenavModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports:
  [MatButtonModule,
     MatCheckboxModule,
     MatFormFieldModule,
     MatIconModule,
     MatInputModule,
     MatSelectModule,
     MatTabsModule,
     MatToolbarModule,
     MatMenuModule,
     MatTableModule,
     MatIconModule,
     MatListModule,
     MatToolbarModule,
     MatSidenavModule,
     MatButtonModule,
     MatCardModule
    ],
  exports:
  [MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule
  ],
})

export class MaterialModule { }