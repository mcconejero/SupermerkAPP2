import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { MarketService } from 'src/app/services/market.service';
import { Market } from 'src/app/model/market';


const ELEMENT_DATA: Market[] = [];

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'acciones']
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private marketService: MarketService, public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
      this.getListaMarket('Lista de supermercados cargada');
      this.showMarket();
  }


  getListaMarket(mensaje:string){
  this.marketService.getAllMarkets().subscribe(listaCategorias=>{
  this.dataSource = new MatTableDataSource<Market>(listaCategorias);
      this.dataSource.paginator = this.paginator

  this.snackBar.open(mensaje,'Cerrar',{
    duration:3000,
    verticalPosition:'top'

  });
},error =>{
  this.snackBar.open('Error al obtener supermercados', 'Cerrar',{
    duration:1000
  });
});
}
getMarkets() {
    
  this.marketService.getAllMarkets().subscribe(listaMarkets => {
    this.dataSource.data = listaMarkets;

  }, error => {
    console.log('Error');
  });
}

showMarket(){
  this.marketService.getAllMarkets().subscribe(marketList =>{
    this.dataSource.data = marketList;
  }, error =>{
    console.log('Error, no ha recibido supermercados');
  })
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

/*openDialogCrearCategoria(){
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
}*/
}
