import { Component, OnInit, Inject } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";

@Component({
  selector: 'app-dialog-delete-product',
  templateUrl: './dialog-delete-product.component.html',
  styleUrls: ['./dialog-delete-product.component.scss']
})
export class DialogDeleteProductComponent implements OnInit {
  public form: FormGroup;

  constructor(private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogDeleteProductComponent>) { }

  ngOnInit() {
    this.form = new FormGroup({
      eliminar: new FormControl('', [Validators.pattern("ELIMINAR"), Validators.required])
    });
  }

  removeProduct() {
    this.productService.deleteProducts(this.data.id).subscribe(products => {
      this.dialogRef.close();
    }, error => {
      console.log(error);
    });
  }

}