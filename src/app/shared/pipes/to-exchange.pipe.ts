import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'convertToExchange',
  pure: true,
})
export class ConvertToExchange implements PipeTransform {


  transform(value: any, currency: any): any {
    
    // * this.getCurrencyValue(money)
    return value * currency.exchange_rate;
  }

  //   getCurrencyValue(currency) {
  //     return currencyValues[currency] | 1;
  //   }


  // transform(value: number, currency: any): number {

  //   let price = value * currency.exchange_rate
  //   return this.getIntegerValue(price);
  // }

  // getIntegerValue(price: number): number {
  //   return Math.floor(price);
  // }

}
