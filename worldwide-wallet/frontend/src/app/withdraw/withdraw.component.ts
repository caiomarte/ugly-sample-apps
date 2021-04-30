import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TransferRequest } from '../models/transfer/transfer-request.model';
import { TransferResponse } from '../models/transfer/transfer-response.model';

@Component({
  selector: 'withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent {
    apiUrl = "";
    withdrawUrl = this.apiUrl + "/debit";

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

    withdraw() {
      if(this.currency != "" && this.currency != "$") {
        var request: TransferRequest = {
          "Currency": this.currency,
          "Difference": this.value
        }

        this.http.post<TransferResponse>(
          this.withdrawUrl,
          request
        ).subscribe((response) => {
          console.log(response);
          this.result = response.Message;
        });
      }
    }
}