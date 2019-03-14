import { Component, OnInit, Inject } from '@angular/core';
import { Category } from 'src/app/interfaces/category-response';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Market } from 'src/app/model/market';
import { MarketService } from 'src/app/services/market.service';
import { ListApiResponse } from 'src/app/interfaces/listApi';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-edit-category',
  templateUrl: './dialog-edit-category.component.html',
  styleUrls: ['./dialog-edit-category.component.scss']
})
export class DialogEditCategoryComponent implements OnInit {
  name: string;
  message: string;
  marketId: Market[];
  ListApi: ListApiResponse;
  category: Category[];
  public form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<DialogEditCategoryComponent>,
    private marketService: MarketService) { }

  ngOnInit() {
    this.getMarkets();
    this.category = this.data.category;
    this.form = this.fb.group({
      name: [this.data.category.name, Validators.compose([Validators.required])],
      message: [this.data.category.message, Validators.compose([Validators.required])],
      marketId: [this.data.category.marketId.id, Validators.compose([Validators.required])]
    });
  }

  saveCategory() {
    const categoryCreate: Category = <Category>this.form.value;
    this.categoryService.updateCategory(categoryCreate, this.data.category.id).subscribe(
      category => {
        this.dialogRef.close();
      }, error => {
        console.log(error);
      });
  }

getMarkets() {
  this.marketService.getAllMarkets().subscribe(listaSupermercados => {
    this.ListApi = listaSupermercados;
    this.marketId = this.ListApi.rows;
  }, error => {
    console.log('Error. No recibe datos.');
  });
}

}
