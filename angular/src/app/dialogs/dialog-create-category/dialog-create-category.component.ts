import { Component, OnInit, Inject } from '@angular/core';
import { CategoryDto } from 'src/app/dto/create-category.dto';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MarketDto } from '../../dto/market.dto';
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
  marketId: Market[];
  public form: FormGroup;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private categoriaService: CategoryService, private marketService: MarketService, public dialogRef:MatDialogRef<DialogCreateCategoryComponent>) { }

  ngOnInit() {
    this.getMarkets();
    this.category = this.data.category;
    this.form = this.fb.group({
      name: [this.data.category.name, Validators.compose([Validators.required])],
      message: [this.data.category.message, Validators.compose([Validators.required])],
      marketId: [this.data.category.marketId.id, Validators.compose([Validators.required])]
    });
  }

  addCategory(){
    const categoryCreate: Category = <Category>this.form.value;
    this.categoriaService.categoryCreate(categoryCreate).subscribe(crearCategoriaResp =>{
      this.dialogRef.close(crearCategoriaResp)
    });
    
  }

  getMarkets(){
    this.marketService.getAllMarkets().subscribe(listaSupermercados =>{
      this.ListApi = listaSupermercados;
      this.marketId = this.ListApi.rows;
    });
  }

}
