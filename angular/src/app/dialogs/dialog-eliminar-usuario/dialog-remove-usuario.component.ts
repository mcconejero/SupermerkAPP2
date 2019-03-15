import { Component, OnInit, Inject} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-dialog-remove-usuario',
    templateUrl: './dialog-remove-usuario.component.html',
    styleUrls: ['./dialog-remove-usuario.component.scss']
  })
  export class DialogDeleteUsuarioComponent implements OnInit {
    public form: FormGroup;
  
    constructor(private usuarioService: UserService, public dialogRef: MatDialogRef<DialogDeleteUsuarioComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    ngOnInit() {
    this.form = new FormGroup( {
        eliminar: new FormControl ('', [Validators.pattern("ELIMINAR") ,Validators.required])
        } );
    }
    
    removeUsuario() {
        this.usuarioService.deleteUser(this.data.id).subscribe(usuarios => {
            this.dialogRef.close();
          }, error => {
              console.log(error);
          });
      }

}