import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { MarketService } from 'src/app/services/market.service';
import { Market } from 'src/app/model/market';
import { ListApiResponse } from 'src/app/interfaces/listApi';
import { DialogCreateMarketComponent } from 'src/app/dialogs/dialog-create-market/dialog-create-market.component';
import { DialogEditMarketComponent } from 'src/app/dialogs/dialog-edit-market/dialog-edit-market.component';
import { DialogRemoveMarketComponent } from 'src/app/dialogs/dialog-delete-market/dialog-delete-market.component';

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

  openDialogCrearMarket(){
    const dialogNuevaCategoria = this.dialog.open(DialogCreateMarketComponent);
    
    dialogNuevaCategoria.afterClosed().subscribe(resultado =>{
      this.getListaMarket();
    })
  }
  
  openDialogDeleteMarket(id: number) {
    const dialogoRemoveMarket = this.dialog.open(DialogRemoveMarketComponent, {data: {id: id}});
  
    dialogoRemoveMarket.afterClosed().subscribe(result => {
      this.getListaMarket();
    });
  }
  
  openDialogEditarMarket(element: Market){
    const dialogEditMarket = this.dialog.open(DialogEditMarketComponent,{
      width:'30%',
      data: {category:element},
    });
  }
}
