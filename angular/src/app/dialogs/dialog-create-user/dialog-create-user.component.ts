import { Component, OnInit, Inject} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { User } from "src/app/model/user";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'app-dialog-create-user',
    templateUrl: './dialog-create-user.component.html',
    styleUrls: ['./dialog-create-user.component.scss']
  })
  export class DialogCreateUserComponent implements OnInit {
    name: string;
    email: string;
    phone: number;
    notes: string;
    password: string;
    i = 0;
    public form: FormGroup;
  
    constructor(private fb: FormBuilder, private usuariosService: UserService, public dialogRef: MatDialogRef<DialogCreateUserComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.form =  this.fb.group ( {
            name: [null , Validators.compose ( [ Validators.required ] )],
            email: [null , Validators.compose ( [ Validators.required ] )],
            password: [null , Validators.compose ( [ Validators.required ] )],
            phone: [null , Validators.compose ( [ Validators.required ] )],
            notes: [null , Validators.compose ( [ Validators.required ] )]
          });
    }
    
    createUsuario() {
        const usuarioCreate: User = <User>this.form.value;
        this.usuariosService.createUsuarios(usuarioCreate).subscribe(
            usuarios => {
              this.dialogRef.close();
            }, error => {
                console.log(error);
            });
    }

    generar() {
        var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
        let pass = '';
        for (this.i = 0; this.i < 7; this.i++) pass += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        this.form.controls['password'].setValue(pass);
      }
    
}