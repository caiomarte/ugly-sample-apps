import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TransferRequest } from '../models/transfer/transfer-request.model';
import { TransferResponse } from '../models/transfer/transfer-response.model';

@Component({
  selector: 'deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent {
    apiUrl = "https://z9azs0kr16.execute-api.us-west-2.amazonaws.com/public";
    depositUrl = this.apiUrl + "/credit";

    constructor(private http: HttpClient) {}

    currency = "";
    value: number;
    result: string;

    selectCurrency(event: any) {
      this.currency = event.target.value;
      this.result = "";
    }
    selectValue(event: any) {
      this.value = event.target.value;
      this.result = "";
    }

    deposit() {
      if(this.currency != "" && this.currency != "$") {
        var request: TransferRequest = {
          "Currency": this.currency,
          "Difference": this.value
        }

        this.http.post<TransferResponse>(
          this.depositUrl,
          request
        ).subscribe((response) => {
          console.log(response);
          this.result = response.Message;
        });
      }
    }
}