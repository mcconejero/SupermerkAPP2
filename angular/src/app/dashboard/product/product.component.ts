import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { MatSnackBar, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { DialogCreateProductComponent } from 'src/app/dialogs/dialog-create-product/dialog-create-product.component';
import { DialogEditProductComponent } from 'src/app/dialogs/dialog-edit-product/dialog-edit-product.component';
import { RecursoCreateResponse } from 'src/app/interfaces/product-response';
import { DialogDeleteProductComponent } from 'src/app/dialogs/dialog-delete-product/dialog-delete-product.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

const ELEMENT_DATA: Product[] = [];

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['titulo', 'autor', 'anyo', 'contenido', 'typeId', 'categoryId', 'acciones']
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  public form: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private recursosService: ProductService,
    public snackBar: MatSnackBar, public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit() {
    this.form =  this.fb.group ( {
      title: ['' , Validators.compose ( [ Validators.required ] )],
      autor: ['' , Validators.compose ( [ Validators.required ] )],
      anyo: ['' , Validators.compose ( [ Validators.required ] )],
      content: ['' , Validators.compose ( [ Validators.required ] )],
      type: ['' , Validators.compose ( [ Validators.required ] )],
      category: ['' , Validators.compose ( [ Validators.required ] )]
    });
    this.getListaRecursos('Listado de datos cargado');
  }

  getListaRecursos(mensaje: string) {
    this.recursosService.getAllRecursos().subscribe(listaRecursos => {
      this.dataSource = new MatTableDataSource<Product>(listaRecursos);
      this.dataSource.paginator = this.paginator;

      this.snackBar.open(mensaje, 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top'
      });
    },error =>  {
      this.snackBar.open('Error al obtener datos', 'Cerrar', {
        duration: 3000,
      });
    });
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

openDialogNuevoRecurso() {
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
}
}

