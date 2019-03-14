import { Component, OnInit, Inject} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { ProductService } from "src/app/services/product.service";

@Component({
    selector: 'app-dialog-delete-market',
    templateUrl: './dialog-delete-market.component.html',
    styleUrls: ['./dialog-delete-market.component.scss']
  })
  export class DialogRemoveMarketComponent implements OnInit {
    public form: FormGroup;
  
    constructor(private productService: ProductService, public dialogRef: MatDialogRef<DialogRemoveMarketComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,) { }
  
    ngOnInit() {
    this.form = new FormGroup( {
        eliminar: new FormControl ('', [Validators.pattern("ELIMINAR") ,Validators.required])
        } );
    }
    
    removeProduct() {
        this.productService.deleteProducts(this.data.id).subscribe(usuarios => {
            this.dialogRef.close();
          }, error => {
              console.log(error);
          });
      }

}