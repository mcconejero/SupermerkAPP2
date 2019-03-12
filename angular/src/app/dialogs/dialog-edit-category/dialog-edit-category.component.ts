import { Component, OnInit, Inject } from '@angular/core';
import { Category } from 'src/app/interfaces/category-response';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-edit-category',
  templateUrl: './dialog-edit-category.component.html',
  styleUrls: ['./dialog-edit-category.component.scss']
})
export class DialogEditCategoryComponent implements OnInit {
  category: Category;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private categoryService: CategoryService,
  public dialogRef: MatDialogRef<DialogEditCategoryComponent>) { }

  ngOnInit() {

    this.category = this.data.category;

  }

  saveCategory(){
    this.categoryService.updateCategory(this.category).subscribe(category => {
      this.dialogRef.close();
    });
  }

}
