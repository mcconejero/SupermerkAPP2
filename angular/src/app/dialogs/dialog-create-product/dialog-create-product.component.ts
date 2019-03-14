import { Product } from "../../model/product";
import { Component, OnInit, Inject} from "@angular/core";
import { ProductService } from "../../services/product.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Category } from "src/app/interfaces/category-response";
import { CategoryService } from "src/app/services/category.service";
import { ListApiResponse } from "src/app/interfaces/listApi";

@Component({
    selector: 'app-dialog-create-product',
    templateUrl: './dialog-create-product.component.html',
    styleUrls: ['./dialog-create-product.component.scss']
  })
  export class DialogCreateProductComponent implements OnInit {
    name: string;
    categoryId: Category[];
    product: Product[];
    ListApi: ListApiResponse;
    public form: FormGroup;
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private productService: ProductService, private categoriesService: CategoryService, public dialogRef: MatDialogRef<DialogCreateProductComponent>,) { }

    ngOnInit() {
        this.getCategories();
        this.product = this.data.product;
        this.form =  this.fb.group ( {
          name: [this.data.product.name, Validators.compose([Validators.required])],
          categoryId: [this.data.product.categoryId.id, Validators.compose([Validators.required])]
          });
    }
    
    createProduct(){
      const productCreate: Product = <Product>this.form.value;
      this.productService.createProducts(productCreate).subscribe(crearProductoResp =>{
        this.dialogRef.close(crearProductoResp)
      });
      
    }

    getCategories() {
        this.categoriesService.getAllCategorias().subscribe(categoryList => {
            this.ListApi = categoryList;
            this.categoryId = this.ListApi.rows;        
          });
    }
    
}