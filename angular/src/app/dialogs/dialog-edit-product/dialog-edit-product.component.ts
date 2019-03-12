import { Product } from "../../model/product";
import { Component, OnInit, Inject} from "@angular/core";
import { ProductService } from "../../services/product.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { RecursoCreateResponse } from "src/app/interfaces/product-response";
import { CategoryService } from "src/app/services/category.service";
import { Category } from "src/app/interfaces/category-response";

@Component({
    selector: 'app-dialog-edit-product',
    templateUrl: './dialog-edit-product.component.html',
    styleUrls: ['./dialog-edit-product.component.scss']
  })
  export class DialogEditProductComponent implements OnInit {
    title: string;
    autor: string;
    anyo: number;
    content: string;
    categoryId: Category[]
    public form: FormGroup;
    resource: RecursoCreateResponse;
  
    constructor(private fb: FormBuilder, private router: Router,
        private recursosService: ProductService, private categoriasService: CategoryService, public dialogRef: MatDialogRef<DialogEditProductComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    ngOnInit() {
        this.getCategorias();
        this.resource = this.data.resource;
        this.form =  this.fb.group ( {
            title: [this.data.resource.title, Validators.compose ( [ Validators.required ] )],
            autor: [this.data.resource.autor, Validators.compose ( [ Validators.required ] )],
            anyo: [this.data.resource.anyo, Validators.compose ( [ Validators.required ] )],
            content: [this.data.resource.content , Validators.compose ( [ Validators.required ] )],
            typeId: [this.data.resource.type.id , Validators.compose ( [ Validators.required ] )],
            categoryId: [this.data.resource.category.id , Validators.compose ( [ Validators.required ] )]
          });
    }
    
    editarRecurso() {
        const recursoCreate: Product = <Product>this.form.value;
        this.recursosService.editRecurso(recursoCreate, this.data.resource.id).subscribe(
            recursos => {
              this.dialogRef.close();
            }, error => {
                console.log(error);
            });
    }

    getCategorias() {
        this.categoriasService.getAllCategorias().subscribe(categoryList => {
            this.categoryId = categoryList;            
          }, error => {
            console.log('Error. No recibe datos.');
        });
    }
}