
export class BillingInfo{
  //cartId            : number;
  checkoutId        : number;
  gst_number        : string;
  gst_treatment     : string;
  place_of_supply   : PlaceOfSupply;
  billing_address   : string;

  constructor(options: {
  
  //cartId            ?: number;
  checkoutId        ?: number;
  gst_number        ?: string;
  gst_treatment     ?: string;
  place_of_supply   ?: PlaceOfSupply;
  billing_address   ?: string;


  } = {}) {
    //this.cartId        = options.cartId           || 0;
    this.checkoutId      = options.checkoutId       || 0;
    this.gst_number      = options.gst_number       || '';
    this.gst_treatment   = options.gst_treatment    || '';
    this.place_of_supply = options.place_of_supply  || new PlaceOfSupply;
    this.billing_address = options.billing_address  || '';
  }
}

export class PlaceOfSupply{
  code      : number;
  name      : string;
  shortName : string;

  constructor(options: {
    code      ?: number;
    name      ?: string;
    shortName ?: string;

  } = {}) {
    this.code        = options.code      || 0;
    this.name        = options.name      || '';
    this.shortName   = options.shortName || '';
  }
}

export class PaymentMethodInfo{
  //cartId         : number;
  checkoutId         : number;
  payment_method : string;

  constructor(options: {  
  //cartId       ?: number;
  checkoutId     ?: number;
  payment_method ?: string;

  } = {}) {
    //this.cartId         = options.cartId         || 0;
    this.checkoutId     = options.checkoutId     || 0;
    this.payment_method = options.payment_method || '';
  }
}
