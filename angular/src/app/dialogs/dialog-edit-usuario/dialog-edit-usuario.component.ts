import { Component, OnInit, Inject} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { User } from "src/app/model/user";
import { UsuarioCreateResponse } from "src/app/interfaces/user-response";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-dialog-edit-usuario',
    templateUrl: './dialog-edit-usuario.component.html',
    styleUrls: ['./dialog-edit-usuario.component.scss']
  })
  export class DialogEditUsuarioComponent implements OnInit {
    name: string;
    email: string;
    phone: string;
    notes: string;
    usuario: User;
    public form: FormGroup;
    user: UsuarioCreateResponse;
  
    constructor(private fb: FormBuilder, private usuarioService: UserService, public dialogRef: MatDialogRef<DialogEditUsuarioComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    ngOnInit() {
        this.user = this.data.user;
        this.form =  this.fb.group ( {
            name: [this.data.user.name, Validators.compose ( [ Validators.required ] )],
            email: [this.data.user.email, Validators.compose ( [ Validators.required ] )],
            phone: [this.data.user.phone, Validators.compose ( [ Validators.required ] )],
            notes: [this.data.user.notes , Validators.compose ( [ Validators.required ] )]
          });
    }
    
    editarUsuario() {
        const usuarioCreate: User = <User>this.form.value;
        this.usuarioService.editUsuarios(usuarioCreate, this.data.user.id).subscribe(
            recursos => {
              this.dialogRef.close();
            }, error => {
                console.log(error);
            });
    }

}