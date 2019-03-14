import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { MatSnackBar, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { ListApiResponse } from 'src/app/interfaces/listApi';

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

/*openDialogNuevoRecurso() {
  const dialogoNuevoRecurso = this.dialog.open(DialogCreateProductComponent);

  dialogoNuevoRecurso.afterClosed().subscribe(result => {
    this.getListaRecursos('Recurso creado');
  });
}

openDialogEditarRecurso(res: RecursoCreateResponse) {
  const dialogoEditRecurso = this.dialog.open(DialogEditProductComponent, {data: {resource: res}});

  dialogoEditRecurso.afterClosed().subscribe(result => {
    this.getListaRecursos('Recurso editado');
  });
}

openDialogEliminarRecurso(id: number) {
  const dialogoRemoveRecurso = this.dialog.open(DialogDeleteProductComponent, {data: {id: id}});

  dialogoRemoveRecurso.afterClosed().subscribe(result => {
    this.getListaRecursos('Recurso eliminado');
  });
}*/
}

