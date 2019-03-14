import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { MatSnackBar, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { ListApiResponse } from 'src/app/interfaces/listApi';
import { DialogCreateProductComponent } from 'src/app/dialogs/dialog-create-product/dialog-create-product.component';
import { DialogEditProductComponent } from 'src/app/dialogs/dialog-edit-product/dialog-edit-product.component';
import { DialogDeleteProductComponent } from 'src/app/dialogs/dialog-delete-product/dialog-delete-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {
  ListApi: ListApiResponse;
  ProductResponse: Product[];
  displayedColumns: string[] = ['name', 'category', 'acciones']
  dataSource = new MatTableDataSource<Product[]>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService,
    public snackBar: MatSnackBar, public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit() {
    this.getListaProducts();
  }

  getListaProducts() {
    this.productService.getAllProducts().subscribe(listaProductos=>{
      this.ListApi = listaProductos;
      this.ProductResponse = this.ListApi.rows;
      this.dataSource = new MatTableDataSource<Product[]>(this.ListApi.rows);
          this.dataSource.paginator = this.paginator
    
    },error =>{
      this.snackBar.open('Error al obtener categorias', 'Cerrar',{
        duration:1000
      });
    });
    }

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

openDialogNewProduct() {
  const dialogoNuevoRecurso = this.dialog.open(DialogCreateProductComponent);

  dialogoNuevoRecurso.afterClosed().subscribe(result => {
    this.getListaProducts();
  });
}

openDialogEditProduct(element: Product) {
  const dialogEditCategory = this.dialog.open(DialogEditProductComponent,{
    width:'30%',
    data: {category:element},
  });
}

openDialogDeleteProduct(id: number) {
  const dialogoRemoveRecurso = this.dialog.open(DialogDeleteProductComponent, {data: {id: id}});

  dialogoRemoveRecurso.afterClosed().subscribe(result => {
    this.getListaProducts();
  });
}
}

