import { Component, OnInit } from '@angular/core';
import { CategoryDto } from 'src/app/dto/create-category.dto';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-create-category',
  templateUrl: './dialog-create-category.component.html',
  styleUrls: ['./dialog-create-category.component.scss']
})
export class DialogCreateCategoryComponent implements OnInit {
  name:string;
  constructor(private categoriaService: CategoryService, public dialogRef:MatDialogRef<DialogCreateCategoryComponent>) { }

  ngOnInit() {
  }


  addCategory(){
    const crearCategoriaDto = new CategoryDto(this.name);
    this.categoriaService.categoryCreate(crearCategoriaDto).subscribe(crearCategoriaResp =>{
      this.dialogRef.close(crearCategoriaResp)
    });
    
  }

}
