import { Product } from "../../model/product";
import { Component, OnInit, Inject} from "@angular/core";
import { ProductService } from "../../services/product.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Category } from "src/app/interfaces/category-response";
import { CategoryService } from "src/app/services/category.service";

@Component({
    selector: 'app-dialog-create-product',
    templateUrl: './dialog-create-product.component.html',
    styleUrls: ['./dialog-create-product.component.scss']
  })
  export class DialogCreateProductComponent implements OnInit {
    title: string;
    autor: string;
    anyo: number;
    content: string;
    categoryId: Category[];
    public form: FormGroup;
  
    constructor(private fb: FormBuilder, private categoriasService: CategoryService, private recursosService: ProductService, public dialogRef: MatDialogRef<DialogCreateProductComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.getCategorias();
        this.form =  this.fb.group ( {
            title: [null , Validators.compose ( [ Validators.required ] )],
            autor: [null , Validators.compose ( [ Validators.required ] )],
            anyo: [null , Validators.compose ( [ Validators.required ] )],
            content: [null , Validators.compose ( [ Validators.required ] )],
            typeId: [null , Validators.compose ( [ Validators.required ] )],
            categoryId: [null , Validators.compose ( [ Validators.required ] )]
          });
    }
    
    createRecurso() {
        const recursoCreate: Product = <Product>this.form.value;
        this.recursosService.createRecursos(recursoCreate).subscribe(
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