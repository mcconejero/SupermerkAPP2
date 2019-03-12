import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { UsuarioCreateResponse } from 'src/app/interfaces/user-response';
import { DialogCreateUserComponent } from 'src/app/dialogs/dialog-create-user/dialog-create-user.component';
import { DialogRemoveUserComponent } from 'src/app/dialogs/dialog-delete-user/dialog-delete-user.component';
import { DialogEditUsuarioComponent } from 'src/app/dialogs/dialog-edit-usuario/dialog-edit-usuario.component';

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'notes', 'role', 'acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  public form: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private usuariosService: UserService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog, private fb: FormBuilder) { }


  ngOnInit() {
    
    this.form =  this.fb.group ( {
      id: ['' , Validators.compose ( [ Validators.required ] )],
      name: ['' , Validators.compose ( [ Validators.required ] )],
      email: ['' , Validators.compose ( [ Validators.required ] )],
      phone: ['' , Validators.compose ( [ Validators.required ] )],
      notes: ['' , Validators.compose ( [ Validators.required ] )],
      role: ['' , Validators.compose ( [ Validators.required ] )],
    });
    this.getListaUsuarios('Listado de datos cargado');
  }

  getListaUsuarios(mensaje: string) {
    this.usuariosService.getAllUsuarios().subscribe(listaUsuarios => {
      this.dataSource = new MatTableDataSource<User>(listaUsuarios);
      this.dataSource.paginator = this.paginator;

      this.snackBar.open(mensaje, 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top'
      });
    },error =>  {
      this.snackBar.open('Error al obtener datos', 'Cerrar', {
        duration: 3000,
      });
    });
}

openDialogNuevoUsuarios() {
  const dialogoNuevoUsuario = this.dialog.open(DialogCreateUserComponent);

  dialogoNuevoUsuario.afterClosed().subscribe(result => {
    this.getListaUsuarios('Usuario creado');
  });
}

openDialogEditarUsuarios(use: UsuarioCreateResponse) {
  const dialogoEditUsuario = this.dialog.open(DialogEditUsuarioComponent, {data: {user: use}});

  dialogoEditUsuario.afterClosed().subscribe(result => {
    this.getListaUsuarios('Usuario editado');
  });
}

openDialogEliminarUsuarios(id: number) {
  const dialogoRemoveUsuario = this.dialog.open(DialogRemoveUserComponent, {data: {id: id}});

  dialogoRemoveUsuario.afterClosed().subscribe(result => {
    this.getListaUsuarios('Usuario eliminado');
  });
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
