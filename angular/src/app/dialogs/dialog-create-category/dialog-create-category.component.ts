import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Market } from 'src/app/model/market';
import { MarketService } from 'src/app/services/market.service';
import { ListApiResponse } from 'src/app/interfaces/listApi';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category-response';

@Component({
  selector: 'app-dialog-create-category',
  templateUrl: './dialog-create-category.component.html',
  styleUrls: ['./dialog-create-category.component.scss']
})
export class DialogCreateCategoryComponent implements OnInit {
  name:string;
  message:string;
  ListApi: ListApiResponse;
  category: Category[];
  supermercados: Market[];
  marketId: string;
  public form: FormGroup;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  private categoriaService: CategoryService,
  private marketService: MarketService,
  public dialogRef:MatDialogRef<DialogCreateCategoryComponent>) { }

  ngOnInit() {
    this.getMarkets();
    this.form = this.fb.group({
      name: [null , Validators.compose ( [ Validators.required ] )],
      message: [null , Validators.compose ( [ Validators.required ] )],
      marketId: [null , Validators.compose ( [ Validators.required ] )]
    });
  }

  addCategory(){
    const categoryCreate: Category = <Category>this.form.value;
    this.categoriaService.categoriasCreate(categoryCreate).subscribe(crearCategoriaResp =>{
      this.dialogRef.close(crearCategoriaResp)
    });
    
  }

  getMarkets(){
    this.marketService.getAllMarkets().subscribe(listaSupermercados =>{
      this.ListApi = listaSupermercados;
      this.supermercados = this.ListApi.rows;
    });
  }

}
