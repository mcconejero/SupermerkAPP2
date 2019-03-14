import { Component, OnInit } from '@angular/core';
import { CategoryDto } from 'src/app/dto/create-category.dto';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogRef } from '@angular/material';
import { MarketDto } from '../../dto/market.dto';
import { Market } from 'src/app/model/market';
import { MarketService } from 'src/app/services/market.service';
import { ListApiResponse } from 'src/app/interfaces/listApi';

@Component({
  selector: 'app-dialog-create-category',
  templateUrl: './dialog-create-category.component.html',
  styleUrls: ['./dialog-create-category.component.scss']
})
export class DialogCreateCategoryComponent implements OnInit {
  name:string;
  message:string;
  marketId: string;
  ListApi: ListApiResponse;
  supermercados: Market[];
    constructor(private categoriaService: CategoryService, private marketService: MarketService, public dialogRef:MatDialogRef<DialogCreateCategoryComponent>) { }

  ngOnInit() {
    this.marketService.getAllMarkets().subscribe(listaSupermercados =>{
      this.ListApi = listaSupermercados;
      this.supermercados = this.ListApi.rows;
    });
  }

  addCategory(){
    const crearCategoriaDto = new CategoryDto(this.name, this.message, this.marketId);
    this.categoriaService.categoryCreate(crearCategoriaDto).subscribe(crearCategoriaResp =>{
      this.dialogRef.close(crearCategoriaResp)
    });
    
  }

}
