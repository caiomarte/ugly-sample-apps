import { Component } from '@angular/core';
import { ExchangeService } from './exchange.service'; 

@Component({
  selector: 'exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent {
  constructor(private service: ExchangeService) {}

  exchangeCurrency = "";
  exchangeCurrencyValue = 0;
  desiredCurrency = "";
  desiredCurrencyValue = 0;
  quotation = 0;
  fee = 0;
  exchangeCurrencyBalance = 0;
  desiredCurrencyBalance = 0;
  newExchangeCurrencyBalance = 0;
  newDesiredCurrencyBalance = 0;
  debitTransaction: boolean;
  creditTransaction: boolean;
  displaySummary = false;

  /* Simulation */
  selectExchangeCurrency(event: any) {
    this.exchangeCurrency = event.target.value;
  }

  selectExchangeCurrencyValue(event: any) {
    this.exchangeCurrencyValue = event.target.value;
    this.desiredCurrencyValue = 0;
  }

  selectDesiredCurrency(event: any) {
    this.desiredCurrency = event.target.value;
  }

  selectDesiredCurrencyValue(event: any) {
    this.desiredCurrencyValue = event.target.value;
    this.exchangeCurrencyValue = 0;
  }

  simulateTransaction() {
    this.service.getExchangeCurrencyBalance(this.exchangeCurrency);
    this.service.getDesiredCurrencyBalance(this.desiredCurrency);
    this.service.getQuotation(this.exchangeCurrency, this.desiredCurrency);
    this.service.getFee(this.exchangeCurrency, this.desiredCurrency);
    
    if(this.exchangeCurrencyValue = 0) {
      this.service.calculateExchangeCurrency(
        this.desiredCurrencyValue, 
        this.quotation, 
        this.fee
      );
    } else if(this.desiredCurrencyValue = 0) {
      this.service.calculateDesiredCurrency(
        this.exchangeCurrencyValue,
        this.quotation,
        this.fee
      );
    }

    this.service.calculateExchangeCurrencyBalance(
      this.exchangeCurrencyBalance,
      this.exchangeCurrencyValue
    );

    this.service.calculateDesiredCurrencyBalance(
      this.desiredCurrencyBalance,
      this.desiredCurrencyValue
    )

    this.exchangeCurrency
    this.displaySummary = true;
  }

  /* Execution */
  executeTransaction() {
    this.debitTransaction = false;
    this.creditTransaction = false;
    this.debitTransaction = this.service.debit(
      this.exchangeCurrency,
      this.exchangeCurrencyValue
    );
    this.creditTransaction = this.service.credit(
      this.desiredCurrency,
      this.desiredCurrencyValue
    );
  }
}