import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrandComponent } from './brand/brand.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WalletComponent } from './wallet/wallet.component';
import { ExchangeComponent } from './exchange/exchange.component';

const appRoutes: Routes = [
  { path: '', component: WalletComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'exchange', component: ExchangeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    NavbarComponent,
    WalletComponent,
    ExchangeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
