import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar, MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { ListApiResponse } from 'src/app/interfaces/listApi';
import { DialogDeleteUsuarioComponent } from 'src/app/dialogs/dialog-eliminar-usuario/dialog-remove-usuario.component';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  ListApi: ListApiResponse;
  userResponse: User[];
  displayedColumns: string[] = ['name', 'email', 'role', 'acciones']
  dataSource = new MatTableDataSource<User[]>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getListaUsers();
  }


  getListaUsers() {
    this.userService.getAllUsers().subscribe(listaUser => {
      this.ListApi = listaUser;
      this.userResponse = this.ListApi.rows;
      this.dataSource = new MatTableDataSource<User[]>(this.ListApi.rows);
      this.dataSource.paginator = this.paginator

    }, error => {
      this.snackBar.open('Error al obtener usuarios', 'Cerrar', {
        duration: 1000
      });
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogDeleteUser(id: string) {
    const dialogRemoveUser = this.dialog.open(DialogDeleteUsuarioComponent, { data: { id: id } });

    dialogRemoveUser.afterClosed().subscribe(result => {
      this.getListaUsers();
    });
  }

}
