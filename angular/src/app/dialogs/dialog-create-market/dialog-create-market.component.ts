import { Component, OnInit, Inject} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ListApiResponse } from "src/app/interfaces/listApi";
import { Market } from "src/app/model/market";
import { MarketService } from "src/app/services/market.service";

@Component({
    selector: 'app-dialog-create-market',
    templateUrl: './dialog-create-market.component.html',
    styleUrls: ['./dialog-create-market.component.scss']
  })
  export class DialogCreateMarketComponent implements OnInit {
    name: string;
    latlong: string;
    markets: Market[];
    ListApi: ListApiResponse;
    public form: FormGroup;
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private marketService: MarketService,
    public dialogRef: MatDialogRef<DialogCreateMarketComponent>) { }

    ngOnInit() {
      this.form = this.fb.group({
        name: [null , Validators.compose ( [ Validators.required ] )],
        latlong: [null , Validators.compose ( [ Validators.required ] )]
    });

    }
    
    addMarket() {
      const marketCreate: Market = <Market>this.form.value;
      this.marketService.marketCreate(marketCreate).subscribe(crearSupermercadoResp =>{
        this.dialogRef.close(crearSupermercadoResp)
      });
      
    }
    
}