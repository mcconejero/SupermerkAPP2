import { Component, OnInit, Inject} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { MarketService } from "src/app/services/market.service";

@Component({
    selector: 'app-dialog-delete-market',
    templateUrl: './dialog-delete-market.component.html',
    styleUrls: ['./dialog-delete-market.component.scss']
  })
  export class DialogRemoveMarketComponent implements OnInit {
    public form: FormGroup;
  
    constructor(private marketService: MarketService, public dialogRef: MatDialogRef<DialogRemoveMarketComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,) { }
  
    ngOnInit() {
    this.form = new FormGroup( {
        eliminar: new FormControl ('', [Validators.pattern("ELIMINAR") ,Validators.required])
        } );
    }
    
    removeMarket() {
        this.marketService.deleteMarket(this.data.id).subscribe(supermercados => {
            this.dialogRef.close();
          }, error => {
              console.log(error);
          });
      }

}