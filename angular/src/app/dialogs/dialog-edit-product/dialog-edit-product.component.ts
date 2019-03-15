import { Product } from "../../model/product";
import { Component, OnInit, Inject } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductResponse } from "src/app/interfaces/product-response";
import { CategoryService } from "src/app/services/category.service";
import { Category } from "src/app/interfaces/category-response";
import { ListApiResponse } from "src/app/interfaces/listApi";

@Component({
  selector: 'app-dialog-edit-product',
  templateUrl: './dialog-edit-product.component.html',
  styleUrls: ['./dialog-edit-product.component.scss']
})
export class DialogEditProductComponent implements OnInit {
  name: string;
  product: Product[];
  categoryId: Category[];
  ListApi: ListApiResponse;
  public form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  private categoriasService: CategoryService,
  private productService: ProductService,
  public dialogRef: MatDialogRef<DialogEditProductComponent>) { }

  ngOnInit() {
    this.getCategorias()
    this.product = this.data.product;
    this.form = this.fb.group({
      name: [this.data.product.name, Validators.compose([Validators.required])],
      categoryId: [this.data.product.categoryId.id, Validators.compose([Validators.required])]
    });
  }

  saveCategory() {
    const productCreate: Product = <Product>this.form.value;
    this.productService.editProducts(productCreate, this.data.product.id).subscribe(
      category => {
        this.dialogRef.close();
      }, error => {
        console.log(error);
      });
  }

  getCategorias() {
    this.categoriasService.getAllCategorias().subscribe(categoryList => {
      this.ListApi = categoryList;
      this.categoryId = this.ListApi.rows;
    }, error => {
      console.log('Error. No recibe datos.');
    });
  }
}