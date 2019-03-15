import { Component, OnInit, Inject} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Market } from "src/app/model/market";
import { MarketService } from "src/app/services/market.service";
import { ListApiResponse } from "src/app/interfaces/listApi";

@Component({
    selector: 'app-dialog-edit-market',
    templateUrl: './dialog-edit-market.component.html',
    styleUrls: ['./dialog-edit-market.component.scss']
  })
  export class DialogEditMarketComponent implements OnInit {
  name: string;
  latlong: string;
  market: Market[];
  ListApi: ListApiResponse;
  public form: FormGroup;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private marketService: MarketService,
    public dialogRef: MatDialogRef<DialogEditMarketComponent>) { }

  ngOnInit() {
    this.market = this.data.market;
    this.form = this.fb.group({
      name: [this.data.market.name, Validators.compose([Validators.required])],
      latlong: [this.data.market.latlong, Validators.compose([Validators.required])]
    });
  }

  saveMarket() {
    const marketCreate: Market = <Market>this.form.value;
    this.marketService.updateMarket(marketCreate, this.data.market.id).subscribe(
      market => {
        this.dialogRef.close();
      }, error => {
        console.log(error);
      });
  }

}