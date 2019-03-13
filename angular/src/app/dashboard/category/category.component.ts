import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { Category } from 'src/app/interfaces/category-response';
import { DialogCreateCategoryComponent } from 'src/app/dialogs/dialog-create-category/dialog-create-category.component';
import { DialogEditCategoryComponent } from 'src/app/dialogs/dialog-edit-category/dialog-edit-category.component';
import { DialogRemoveCategoriyComponent } from 'src/app/dialogs/dialog-delete-category/dialog-delete-category.component';
import { ListApiResponse } from 'src/app/interfaces/listApi';

const ELEMENT_DATA: Category[] = [];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  ListApi: ListApiResponse;
  CategoryResponse: Category[];
  displayedColumns: string[] = ['name', 'message', 'market', 'acciones']
  dataSource = new MatTableDataSource<Category[]>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private categoryService: CategoryService, public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.getListaCategorias();
  }


  getListaCategorias(){
  this.categoryService.getAllCategorias().subscribe(listaCategorias=>{
  this.ListApi = listaCategorias;
  this.CategoryResponse = this.ListApi.rows;
  this.dataSource = new MatTableDataSource<Category[]>(this.ListApi.rows);
      this.dataSource.paginator = this.paginator
      console.log(this.CategoryResponse);

},error =>{
  this.snackBar.open('Error al obtener categorias', 'Cerrar',{
    duration:1000
  });
});
}
/*getCategorias() {
  this.categoryService.getAllCategorias().subscribe(listaCategorias => {
    this.dataSource.data = listaCategorias;

  }, error => {
    console.log('Error');
  });
}

showCategory(){
  this.categoryService.getAllCategorias().subscribe(categoryList =>{
    this.dataSource.data = categoryList;
  }, error =>{
    console.log('Error, no ha recibido categorias');
  })
}*/

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

openDialogCrearCategoria(){
  const dialogNuevaCategoria = this.dialog.open(DialogCreateCategoryComponent);
  
  dialogNuevaCategoria.afterClosed().subscribe(resultado =>{
    this.getListaCategorias();
  })
}

openDialogDeleteCategorias(id: number) {
  const dialogoRemoveRecurso = this.dialog.open(DialogRemoveCategoriyComponent, {data: {id: id}});
}

openDialogEditarCategoria(element: Category){
  const dialogEditarCategoria = this.dialog.open(DialogEditCategoryComponent,{
    width:'30%',
    data: {category:element},
  });
}
}
