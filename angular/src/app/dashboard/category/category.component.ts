import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Category } from 'src/app/interfaces/category-response';
import { DialogCreateCategoryComponent } from 'src/app/dialogs/dialog-create-category/dialog-create-category.component';
import { DialogEditCategoryComponent } from 'src/app/dialogs/dialog-edit-category/dialog-edit-category.component';
import { DialogRemoveCategoriyComponent } from 'src/app/dialogs/dialog-delete-category/dialog-delete-category.component';

const ELEMENT_DATA: Category[] = [];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'acciones']
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private categoriaService: CategoryService, public snackBar: MatSnackBar, public dialog: MatDialog) { }


  ngOnInit() {
      this.getListaCategorias('Lista de categorías cargada');
      this.showCategory();
  }


  getListaCategorias(mensaje:string){
  this.categoriaService.getAllCategorias().subscribe(listaCategorias=>{
  this.dataSource = new MatTableDataSource<Category>(listaCategorias);
      this.dataSource.paginator = this.paginator

  this.snackBar.open(mensaje,'Cerrar',{
    duration:3000,
    verticalPosition:'top'

  });
},error =>{
  this.snackBar.open('Error al obtener categorias', 'Cerrar',{
    duration:1000
  });
});
}
getCategorias() {
    
  this.categoriaService.getAllCategorias().subscribe(listaCategorias => {
    this.dataSource.data = listaCategorias;

  }, error => {
    console.log('Error');
  });
}

showCategory(){
  this.categoriaService.getAllCategorias().subscribe(categoryList =>{
    this.dataSource.data = categoryList;
  }, error =>{
    console.log('Error, no ha recibido categorias');
  })
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

openDialogCrearCategoria(){
  const dialogNuevaCategoria = this.dialog.open(DialogCreateCategoryComponent);
  
  dialogNuevaCategoria.afterClosed().subscribe(resultado =>{
    this.showCategory();
  })
}

openDialogDeleteCategorias(id: number) {
  const dialogoRemoveRecurso = this.dialog.open(DialogRemoveCategoriyComponent, {data: {id: id}});

  dialogoRemoveRecurso.afterClosed().subscribe(result => {
    this.getListaCategorias('Recurso eliminado');
  });
}

openDialogEditarCategoria(element: Category){
  const dialogEditarCategoria = this.dialog.open(DialogEditCategoryComponent,{
    width:'30%',
    data: {category:element},
  });
  dialogEditarCategoria.afterClosed().subscribe(result => {
    this.getListaCategorias('Categoria Modificada');
  });
}
}
