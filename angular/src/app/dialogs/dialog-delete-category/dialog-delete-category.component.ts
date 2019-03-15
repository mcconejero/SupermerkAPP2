import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CategoryService } from 'src/app/services/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-delete-category',
  templateUrl: './dialog-delete-category.component.html',
  styleUrls: ['./dialog-delete-category.component.scss']
})
export class DialogDeleteCategoryComponent implements OnInit {
  public form: FormGroup;

  constructor(private categoriaService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogDeleteCategoryComponent>) { }

  ngOnInit() {
    this.form = new FormGroup({
      eliminar: new FormControl('', [Validators.pattern("ELIMINAR"), Validators.required])
    });
  }

  removeCategoria() {
    this.categoriaService.eliminarCategorias(this.data.id).subscribe(categorias => {
      this.dialogRef.close();
    }, error => {
      console.log(error);
    });
  }
}
