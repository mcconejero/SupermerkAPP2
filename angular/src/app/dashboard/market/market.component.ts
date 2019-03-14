import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { MarketService } from 'src/app/services/market.service';
import { Market } from 'src/app/model/market';
import { ListApiResponse } from 'src/app/interfaces/listApi';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  ListApi: ListApiResponse;
  MarketResponse: Market[];
  displayedColumns: string[] = ['name', 'latlong', 'acciones']
  dataSource = new MatTableDataSource<Market[]>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private marketService: MarketService, public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.getListaMarket();
  }


  getListaMarket() {
    this.marketService.getAllMarkets().subscribe(listaSupermercados => {
      this.ListApi = listaSupermercados;
      this.MarketResponse = this.ListApi.rows;
      this.dataSource = new MatTableDataSource<Market[]>(this.ListApi.rows);
      this.dataSource.paginator = this.paginator

    }, error => {
      this.snackBar.open('Error al obtener categorias', 'Cerrar', {
        duration: 1000
      });
    });
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
