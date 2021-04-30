import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { WalletBalanceResponse } from '../models/wallet-balance/wallet-balance-response.model';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  
  apiUrl = ""
  getWalletBalanceUrl = this.apiUrl + "/getwalletbalance";
    
  constructor(private http: HttpClient) {}
  
  real: number;
  dolar: number;
  euro: number;
  pound: number;
  

  ngOnInit() {
    this.getBalance();
  }
    
  getBalance() {
    this.http.get<WalletBalanceResponse>(this.getWalletBalanceUrl)
             .subscribe((response) => {
               console.log(response);
               this.real = response.Balance["R$"];
               this.dolar = response.Balance["US$"];
               this.euro = response.Balance["€$"];
               this.pound = response.Balance["£$"];
    });
  }
}