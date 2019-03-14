import { Component, OnInit, Inject} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";

import { ProductResponse } from "src/app/interfaces/product-response";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-dialog-delete-user',
    templateUrl: './dialog-delete-user.component.html',
    styleUrls: ['./dialog-delete-user.component.scss']
  })
  export class DialogRemoveUserComponent implements OnInit {
    resource: ProductResponse;
    public form: FormGroup;
  
    constructor(private fb: FormBuilder, private usuarioService: UserService, public dialogRef: MatDialogRef<DialogRemoveUserComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,) { }
  
    ngOnInit() {
    this.form = new FormGroup( {
        eliminar: new FormControl ('', [Validators.pattern("ELIMINAR") ,Validators.required])
        } );
    }
    
    removeUsuario() {
        this.usuarioService.deleteUsuarios(this.data.id).subscribe(usuarios => {
            this.dialogRef.close();
          }, error => {
              console.log(error);
          });
      }

}