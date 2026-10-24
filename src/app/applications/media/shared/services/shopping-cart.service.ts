import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppURL } from 'src/app/app-url';
import { LOCAL_STORAGE } from '@app-shared-constants';
import { LocalstorageService } from '@app-shared-services';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  moduleName = 'ShoppingCart';
  isEditCart: boolean = false;

  shoppingCartUrl = AppURL.scart;
  shoppingCartLastCampaignUrl = AppURL.scartcampaign;
  shoppingBillingUrl = AppURL.billingurl;
  userAddressUrl = AppURL.useraddressurl;
  paymentmethodInfoUrl = AppURL.paymentmethodinfourl;
  paymentProcessUrl = AppURL.paymentprocessurl;
  razorpayPaymentSuccessUrl = AppURL.razorpaypaymentsuccessurl;
  couponCodeUrl = AppURL.couponCodeUrl;

  manualPaymentDetailsUrl       = AppURL.manualPaymentDetailsurl;
  manualPaymentProcessurl       = AppURL.manualPaymentProcessurl;
  manualPaymentSuccessurl       = AppURL.manualPaymentSuccessurl;
  manualPaymentFailurl          = AppURL.manualPaymentFailurl;

  salesOrderPaymentProcessurl       = AppURL.salesOrderPaymentProcessurl;
  salesOrderPaymentSuccessurl       = AppURL.salesOrderPaymentSuccessurl;
  salesOrderPaymentFailurl          = AppURL.salesOrderPaymentFailurl;

  clientRateMyServiceDetailsurl     = AppURL.clientRateMyServiceDetailsurl;
  vendorRateMyServiceDetailsurl     = AppURL.vendorRateMyServiceDetailsurl;
  admiUserListurl                   = AppURL.admiUserListurl;
  courierConfirmationReceivedurl    = AppURL.courierConfirmationReceivedurl;
  courierConfirmationNotReceivedurl = AppURL.courierConfirmationNotReceivedurl;


  shoppingCartSub = new Subject<any>();
  shoppingCartData: any[] = [];
  totalCartItem: any = null;

  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService,
  ) { }

  updateShoppingCartData() {


    let item = this.localstorageService.getItem(LOCAL_STORAGE.addtoplan);

    this.shoppingCartData = (item != null) ? JSON.parse(item) : [];

    this.totalCartItem = (this.shoppingCartData.length > 0) ? this.shoppingCartData.length : null;

    this.shoppingCartSub.next(this.totalCartItem);
  }


  checkCouponCodeValid(data: any): Observable<any> {
    const url = `${this.couponCodeUrl}`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {

        }),

        catchError(this.handleError<any>('Coupon Code Data Added', { "status": false, "message": "Coupon Code Data Data Added Error" }))
      );
  }

  shoppingCartLastCampaignList(): Observable<any> {
    const url = `${this.shoppingCartLastCampaignUrl}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {

        }),
        catchError(this.handleError<any>('Shopping Cart Data List', { "status": false, "message": "Get Shopping Cart Data Error" }))
      );
  }


  shoppingCartCreate(data: any): Observable<any> {
    const url = `${this.shoppingCartUrl}`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {

        }),

        catchError(this.handleError<any>('Shopping Cart Data Added', { "status": false, "message": "Shopping Cart Data Added Error" }))
      );
  }

  shoppingCartList(): Observable<any> {
    const url = `${this.shoppingCartUrl}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {

        }),
        catchError(this.handleError<any>('Shopping Cart Data List', { "status": false, "message": "Get Shopping Cart Data Error" }))
      );
  }

  shoppingCartUpdate(data: any): Observable<any> {
    const url = `${this.shoppingCartUrl}`;
    return this.http.put<any>(url, data['formData'])
      .pipe(
        tap(data => {

        }),

        catchError(this.handleError<any>('Shopping Cart Data Edit', { "status": false, "message": "Shopping Cart Data Edit Error" }))
      );
  }

  shoppingCartItemList(data: any): Observable<any> {
    const url = `${this.shoppingCartUrl}/${data['campaignId']}/item`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {

        }),
        catchError(this.handleError<any>('Shopping Cart Item Data List', { "status": false, "message": "Get Shopping Cart Item Data Error" }))
      );
  }

  shoppingCartItemRemove(data: any): Observable<any> {
    const url = `${this.shoppingCartUrl}/item/${data['itemId']}`;
    return this.http.delete<any>(url)
      .pipe(
        tap(data => {

        }),

        catchError(this.handleError<any>('Shopping Cart Item Data Delete', { "status": false, "message": "Shopping Cart Item Data Delete Error" }))
      );
  }



  getBillingList(data: any): Observable<any> {
    const url = `${this.shoppingBillingUrl}/${data['campaignId']}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),

        catchError(this.handleError<any>('Billing Info Data', { "status": false, "message": "get Billing Info Error" }))
      );
  }


  addNewAddress(data: any): Observable<any> {
    const url = `${this.userAddressUrl}`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Add New Address ', { "status": false, "message": "Add New Address  Error" }))
      );
  }

  editAddress(data: any): Observable<any> {
    const url = `${this.userAddressUrl}/${data['addressId']}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {

        }),

        catchError(this.handleError<any>('Address Edit', { "status": false, "message": "Address get Error" }))
      );
  }

  updateAddress(data: any): Observable<any> {
    const url = `${this.userAddressUrl}`;
    return this.http.put<any>(url, data['formData'])
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Update Address', { "status": false, "message": "Update Address Error" }))
      );
  }

  removeAddress(data: any): Observable<any> {
    const url = `${this.userAddressUrl}/${data['addressId']}`;
    return this.http.delete<any>(url)
      .pipe(
        tap(data => {

        }),

        catchError(this.handleError<any>('Address Delete', { "status": false, "message": "Address Delete Error" }))
      );
  }


  getPaymentMethodList(): Observable<any> {
    const url = `${this.paymentmethodInfoUrl}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),

        catchError(this.handleError<any>('Payment method Data', { "status": false, "message": "get Payment Method Error" }))
      );
  }


  paymentProceed(data: any): Observable<any> {
    // this.loader.open();
    const url = `${this.paymentProcessUrl}`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
          // this.loader.close();
        }),
        catchError(this.handleError<any>('Payment Proceed', { "status": false, "message": "Payment Proceed Error" }))
      );
  }


  razorpayPaymentSuccess(data: any): Observable<any> {
    // this.loader.open();
    const url = `${this.razorpayPaymentSuccessUrl}`;
    return this.http.post<any>(url, data)
      .pipe(
        tap(data => {
          // this.loader.close();
        }),
        catchError(this.handleError<any>('Razorpay Payment Success', { "status": false, "message": "Razorpay Payment Error" }))
      );
  }





  getManualPaymentDetails(token: string): Observable<any> {

    // this.loder.open();

    const url = `${this.manualPaymentDetailsUrl}/${token}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
          //  this.loder.close();
        }),
        catchError(this.handleError<any>('Order summary Data', { "status": false, "message": "get Order summary Error" }))
      );
  }

  manualPaymentProceed(data: any): Observable<any> {
    // this.loader.open();
    const url = `${this.manualPaymentProcessurl}`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
          // this.loader.close();
        }),
        catchError(this.handleError<any>('Payment Proceed', { "status": false, "message": "Payment Proceed Error" }))
      );
  }


  manualPaymentSuccess(data: any): Observable<any> {
    // this.loader.open();
    const url = `${this.manualPaymentSuccessurl}`;
    return this.http.post<any>(url, data)
      .pipe(
        tap(data => {
          // this.loader.close();
        }),
        catchError(this.handleError<any>('Razorpay Payment Success', { "status": false, "message": "Razorpay Payment Success Error" }))
      );
  }

  manualPaymentFail(data: any): Observable<any> {
    // this.loader.open();
    const url = `${this.manualPaymentFailurl}`;
    return this.http.post<any>(url, data)
      .pipe(
        tap(data => {
          // this.loader.close();
        }),
        catchError(this.handleError<any>('Razorpay Payment Fail', { "status": false, "message": "Razorpay Payment Fail Error" }))
      );
  }


  salesOrderPaymentProceed(data: any): Observable<any> {
    // this.loader.open();
    const url = `${this.salesOrderPaymentProcessurl}`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
          // this.loader.close();
        }),
        catchError(this.handleError<any>('Payment Proceed', { "status": false, "message": "Payment Proceed Error" }))
      );
  }


  salesOrderPaymentSuccess(data: any): Observable<any> {
    // this.loader.open();
    const url = `${this.salesOrderPaymentSuccessurl}`;
    return this.http.post<any>(url, data)
      .pipe(
        tap(data => {
          // this.loader.close();
        }),
        catchError(this.handleError<any>('Razorpay Payment Success', { "status": false, "message": "Razorpay Payment Success Error" }))
      );
  }

  salesOrderPaymentFail(data: any): Observable<any> {
    // this.loader.open();
    const url = `${this.salesOrderPaymentFailurl}`;
    return this.http.post<any>(url, data)
      .pipe(
        tap(data => {
          // this.loader.close();
        }),
        catchError(this.handleError<any>('Razorpay Payment Fail', { "status": false, "message": "Razorpay Payment Fail Error" }))
      );
  }


  courierConfirmationReceived(data: any): Observable<any> {
    
    // this.loader.open();
    const url = `${this.courierConfirmationReceivedurl}`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
          // this.loader.close();
        }),
        catchError(this.handleError<any>('Courier Confirmation Received', { "status": false, "message": "Courier Confirmation Received Error" }))
      );
  }

  courierConfirmationNotReceived(data: any): Observable<any> {
    // this.loader.open();
    const url = `${this.courierConfirmationNotReceivedurl}`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
          // this.loader.close();
        }),
        catchError(this.handleError<any>('Courier Confirmation Not Received', { "status": false, "message": "Courier Confirmation Not Received Error" }))
      );
  }


  



  getClientRateMyServiceDetails(token: string): Observable<any> {

    // this.loder.open();

    const url = `${this.clientRateMyServiceDetailsurl}/${token}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
          //  this.loder.close();
        }),
        catchError(this.handleError<any>('Client Rate My Service Data', { "status": false, "message": "get Client Rate My Service Error" }))
      );
  }

  clientRateMyServiceUpdate(data: any): Observable<any> {
    const url = `${this.clientRateMyServiceDetailsurl}`;
    return this.http.put<any>(url, data['formData'])
      .pipe(
        tap(data => {

        }),

        catchError(this.handleError<any>('Client Rate My Service Data', { "status": false, "message": "Client Rate My Service Edit Error" }))
      );
  }


  getVendorRateMyServiceDetails(token: string): Observable<any> {

    // this.loder.open();

    const url = `${this.vendorRateMyServiceDetailsurl}/${token}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
          //  this.loder.close();
        }),
        catchError(this.handleError<any>('Vendor Rate My Service Data', { "status": false, "message": "get Vendor Rate My Service Error" }))
      );
  }

  vendorRateMyServiceUpdate(data: any): Observable<any> {
    const url = `${this.vendorRateMyServiceDetailsurl}`;
    return this.http.put<any>(url, data['formData'])
      .pipe(
        tap(data => {

        }),

        catchError(this.handleError<any>('Vendor Rate My Service Data', { "status": false, "message": "Vendor Rate My Service Edit Error" }))
      );
  }

  getAdminUserList(): Observable<any> {
    const url = `${this.admiUserListurl}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),

        catchError(this.handleError<any>('Admin User Data', { "status": false, "message": "get Admin User Error" }))
      );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //return of(result as T);
      return of(result as T);
    };

  }

}
