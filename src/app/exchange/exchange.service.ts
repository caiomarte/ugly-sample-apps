import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BalanceRequest } from './models/balance/balance-request.model';
import { BalanceResponse } from './models/balance/balance-response.model';
import { QuotationRequest } from './models/quotation/quotation-request.model';
import { QuotationResponse } from './models/quotation/quotation-response.model';
import { FeeRequest } from './models/fee/fee-request.model';
import { FeeResponse } from './models/fee/fee-response.model';
import { CalculateCurrencyRequest } from './models/calculate-currency/calculate-currency-request.model';
import { CalculateCurrencyResponse } from './models/calculate-currency/calculate-currency-response.model';
import { CalculateBalanceRequest } from './models/calculate-balance/calculate-balance-debit-request.model';
import { CalculateBalanceResponse } from './models/calculate-balance/calculate-balance-debit-response.model';
import { TransactionRequest } from './models/transaction/transaction-request.model';
import { TransactionResponse } from './models/transaction/transaction-response.model';

@Injectable({providedIn: 'root'})
export class ExchangeService {
    apiUrl = " https://z9azs0kr16.execute-api.us-west-2.amazonaws.com/public"
    getCurrencyBalanceUrl = this.apiUrl + "/getcurrencybalance";
    getQuotationUrl = this.apiUrl + "/getquotation";
    getFeeUrl = this.apiUrl + "/getfee";
    calculateExchangeCurrencyUrl = this.apiUrl + "/calculateexchangecurrency";
    calculateDesiredCurrencyUrl = this.apiUrl + "/calculatedesiredcurrency";
    calculateExchangeBalanceUrl = this.apiUrl + "/calculateexchangecurrencybalance";
    calculateDesiredBalanceUrl = this.apiUrl + "/calculatedesiredcurrencybalance";
    debitUrl = this.apiUrl + "/debit";
    creditUrl = this.apiUrl + "/credit";

    exchangeCurrencyBalance = 0;
    desiredCurrencyBalance = 0;
    quotation = 0;
    fee = 0;
    exchangeCurrencyValue = 0;
    desiredCurrencyValue = 0;
    newExchangeCurrencyBalance = 0;
    newDesiredCurrencyBalance = 0;
    displaySummary = false;

    constructor(private http: HttpClient) {}

    getExchangeCurrencyBalance(currency: string) {
        var request: BalanceRequest = {
            Currency: currency
        }
        
        this.http.post<BalanceResponse>(
            this.getCurrencyBalanceUrl,
            request
        ).subscribe((response) => {
            console.log(response);
            this.exchangeCurrencyBalance = response.Amount;
        });
    }

    getDesiredCurrencyBalance(currency: string) {
        var request: BalanceRequest = {
            Currency: currency
        }
        
        this.http.post<BalanceResponse>(
            this.getCurrencyBalanceUrl,
            request
        ).subscribe((response) => {
            console.log(response);
            this.desiredCurrencyBalance = response.Amount;
        });
    }

    getQuotation(exchangeCurrency: string, desiredCurrency: string) {
        var request: QuotationRequest = {
            "ExchangeCurrency": exchangeCurrency,
            "DesiredCurrency": desiredCurrency
        }

        this.http.post<QuotationResponse>(
            this.getQuotationUrl,
            request
        ).subscribe((response) => {
            console.log(response);
            this.quotation = response.Quote;
        });
    }

    getFee(exchangeCurrency: string, desiredCurrency: string) {
        var request: FeeRequest = {
            "ExchangeCurrency": exchangeCurrency,
            "DesiredCurrency": desiredCurrency
        }

        this.http.post<FeeResponse>(
            this.getFeeUrl,
            request
        ).subscribe((response) => {
            console.log(response);
            this.fee = response.Fee;
        });
    }
    
    calculateExchangeCurrency(value: number, quote: number, fee: number) {
        var request: CalculateCurrencyRequest = {
            "Value": value,
            "Quote": quote,
            "Fee": fee
        }

        this.http.post<CalculateCurrencyResponse>(
            this.calculateExchangeCurrencyUrl,
            request
        ).subscribe((response) => {
            console.log(response);
            this.exchangeCurrencyValue = response.Amount;
        });
    }

    calculateDesiredCurrency(value: number, quote: number, fee: number) {
        var request: CalculateCurrencyRequest = {
            "Value": value,
            "Quote": quote,
            "Fee": fee
        }

        this.http.post<CalculateCurrencyResponse>(
            this.calculateDesiredCurrencyUrl,
            request
        ).subscribe((response) => {
            console.log(response);
            this.desiredCurrencyValue = response.Amount;
        });
    }
    
    calculateExchangeCurrencyBalance(currentBalance: number, debit: number) {
        var request: CalculateBalanceRequest = {
            "Value": currentBalance,
            "Difference": debit
        }

        this.http.post<CalculateBalanceResponse>(
            this.calculateExchangeBalanceUrl,
            request
        ).subscribe((response) => {
            console.log(response);
            this.newExchangeCurrencyBalance = response.Amount;
        });
    }

    calculateDesiredCurrencyBalance(currentBalance: number, credit: number) {
        var request: CalculateBalanceRequest = {
            "Value": currentBalance,
            "Difference": credit
        }

        this.http.post<CalculateBalanceResponse>(
            this.calculateDesiredBalanceUrl,
            request
        ).subscribe((response) => {
            console.log(response);
            this.newDesiredCurrencyBalance = response.Amount;
            this.displaySummary = true;
        });
    }

    debit(currency: string, debitValue: number): boolean {
        var request: TransactionRequest = {
            "Currency": currency,
            "Difference": debitValue
        }
        var response: TransactionResponse;

        this.http.post<TransactionResponse>(
            this.debitUrl,
            request
        ).subscribe((res) => {
            console.log(res);
            response = res
        });
        return response.Transaction;
    }

    credit(currency: string, creditValue: number): boolean {
        var request: TransactionRequest = {
            "Currency": currency,
            "Difference": creditValue
        }
        var response: TransactionResponse;

        this.http.post<TransactionResponse>(
            this.creditUrl,
            request
        ).subscribe((res) => {
            console.log(res);
            response = res;
        });

        return response.Transaction;
    }   
}