import { Component, NgZone, OnInit } from '@angular/core';
import { ShoppingCartService } from '@app-media-services';
import { BillingInfo } from 'src/app/shared/model/shopping-cart';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowRefService } from '@app-shared-services';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MetaInformation } from '@app-shared-model';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['billing'];
  app_svg_icon_list = APP_SVG_ICON_LIST;
  showBillingAddress = true;
  isAuthenticated = true;
  isEditAddress = false;
  isAddAddress = false;
  isDataLoaded: boolean = true;

  campaignId: number = 0;
  billingHasError: boolean = false;
  billingInfoData: any;
  paymentMethodInfoData: any[] = [];
  billingInfo: any = BillingInfo;
  gstTreatment: any = '';
  placeOfSupply: any;

  paymentProceedData: any = { shoppingcart_id: null, payment_method: null, billing_address: null };
  userInfo: any;

  addNewAddressForm = new UntypedFormGroup({
    id: new UntypedFormControl(0),
    company_name: new UntypedFormControl(''),
    full_name: new UntypedFormControl('', [Validators.required]),
    address: new UntypedFormControl('', [Validators.required]),
    city: new UntypedFormControl('', [Validators.required]),
    state: new UntypedFormControl('', [Validators.required]),
    zipcode: new UntypedFormControl('', [Validators.required]),
  });

  constructor(
    private shoppingCartService: ShoppingCartService,
    private commonService: CommonService,
    private loaderService: LoaderService,
    private userService: UserService,
    private winRef: WindowRefService,
    private route: ActivatedRoute,
    private _ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setMetaData();
    this.route.params.subscribe(params => {
      this.campaignId = params['campaignId'];
      this.paymentProceedData.shoppingcart_id = Number(this.campaignId);
    });

    this.userInfo = this.userService.userInfo;

    this.loadScript('https://checkout.razorpay.com/v1/checkout.js');
    this.getPaymentmethodInfo();

    this.getBillingInfo();
  }


  getBillingInfo() {

    let serviceData: any = [];
    serviceData['campaignId'] = this.campaignId;
    this.showBillingAddress = true;

    this.loaderService.open();

    this.shoppingCartService.getBillingList(serviceData).subscribe(result => {

      this.loaderService.close();

      if (result.status === true) {
        this.billingInfoData = result.data;

        this.checkAmountAndPaymentMethod();


        this.billingInfo.gst_number = null;
        this.billingInfo.gst_treatment = null;
        this.billingInfo.place_of_supply = null;
        //this.billingInfo.gst_number = this.billingInfoData.GSTNumber;
        //this.billingInfo.gst_treatment = this.billingInfoData.gstTreatment;
        //this.billingInfo.place_of_supply = this.billingInfoData.placeOfSupply;
        this.gstTreatment = this.billingInfoData.gstTreatment;
        this.placeOfSupply = this.billingInfoData.placeOfSupply != null ? this.billingInfoData.placeOfSupply : this.placeOfSupply;
      }
    });
  }


  addNewAddress(isOpen: any) {
    if (isOpen) {
      this.isAddAddress = true;
      this.showBillingAddress = false;
    }
    else {
      this.isAddAddress = false;
      this.showBillingAddress = true;
    }
  }


  editAddress(addressId: number) {
    this.showBillingAddress = false;
    this.isAddAddress = true;
    let serviceData: any = [];
    serviceData['addressId'] = addressId;

    this.isEditAddress = true;

    this.loaderService.open();

    this.shoppingCartService.editAddress(serviceData).subscribe(result => {

      this.loaderService.close();

      if (result.status == true) {
        let data = result.data;

        const formdata = {
          id: data.id,
          full_name: data.fullname,
          company_name: data.company_name,
          address: data.address,
          city: data.city,
          state: data.state,
          zipcode: data.zipcode,
        };

        this.addNewAddressForm.setValue(formdata);
      }
    });
  }


  addNewAddressSubmit() {

    if (this.addNewAddressForm.valid == true) {

      let serviceData: any = [];
      serviceData['formData'] = this.addNewAddressForm.value;

      this.loaderService.open();

      this.shoppingCartService.addNewAddress(serviceData).subscribe(result => {

        this.loaderService.close();

        if (result.status == true) {
          this.getBillingInfo();
          this.commonService.openSnackBar('Billing Address Added Successfully');
          this.isAddAddress = false;
        }
      });
    }
  }

  editAddressSubmit() {

    if (this.addNewAddressForm.valid == true) {

      let serviceData: any = [];
      serviceData['formData'] = this.addNewAddressForm.value;
      this.loaderService.open();

      this.shoppingCartService.updateAddress(serviceData).subscribe(result => {

        this.loaderService.close();

        if (result.status == true) {
          this.getBillingInfo();
          this.commonService.openSnackBar('Billing Address Update Successfully');
          this.isAddAddress = false;
        }

        this.isEditAddress = false;

      });
    }

  }


  UseThisAddress(address: any) {
    address.email = this.userService.userInfo?.email;
    address.contact = this.userService.userInfo?.contact;

    this.paymentProceedData.billing_address = address;
  }




  removeAddress(addressId: number) {

    let serviceData: any = [];
    serviceData['addressId'] = addressId;

    this.loaderService.open();

    this.shoppingCartService.removeAddress(serviceData).subscribe(result => {
      this.loaderService.close();
      this.getBillingInfo();
      this.commonService.openSnackBar('Billing Address Delete Successfully');
    });
  }



  // paymentMethod

  getPaymentmethodInfo() {

    this.shoppingCartService.getPaymentMethodList().subscribe(responce => {

      if (responce.status === true) {
        this.paymentMethodInfoData = responce.data;

        let defaultMethod = this.paymentMethodInfoData.find(x => x.isDefault === 1);

        this.paymentProceedData.payment_method = defaultMethod != undefined ? defaultMethod : null;
      }
    });
  }

  changePaymentMethod(event: any) {

    let payment_method = this.paymentMethodInfoData.find(x => x.alias === event.target.value);

    this.paymentProceedData.payment_method = payment_method;
  }


  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }


  paymentProceed() {

    this.billingHasError = false;
    if (this.paymentProceedData.billing_address == null) {
      this.billingHasError = true;
      return;
    }


    let serviceData: any = [];
    serviceData['formData'] = this.paymentProceedData;
    this.loaderService.open();

    this.shoppingCartService.paymentProceed(serviceData).subscribe(response => {

      this.loaderService.close();
      if (response.payment_method == "razorpay") {
        this.razorpay(response)
      }
      else if (response.payment_method == "purchaseorder") {

        this.orderSuccess(response.order_token);
      }

    });
  }


  razorpay(response: any) {
    this.payWithRazor(response.id);
  }



  payWithRazor(val: any) {
    const options: any = {
      //key: 'rzp_test_3DVU4m50KmZpH3',
      //amount: 125500, // amount should be in paise format to display Rs 1255 without decimal point
      ///currency: 'INR',
      name: 'Excellent publicity', // company name or product name
      //description: 'Gujarat',  // product description
      image: 'https://www.excellentpublicity.com/assets/logo/excellent-logo-color.png', // company logo or product image
      order_id: val, // order_id created by you in backend
      prefill: {
        name: this.userInfo?.name,
        email: this.userInfo?.email,
        contact: this.userInfo?.contact
      },
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#c01625'
      }
    };

    options.handler = ((response: any, error: any) => {
      options.response = response;
      this.handle_payment_success_response(response);
      // call your backend api to verify payment signature & capture transaction
    });

    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
    });

    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();

    rzp.on('payment.failed', function (response: any) {
      //this.handle_payment_fail_response(response);
    });
  }


  // handle_payment_fail_response(response: any) {

  // }

  handle_payment_success_response(rpresponse: any) {


    let data: any = {};
    data.razorpay_order_id = rpresponse.razorpay_order_id;
    data.razorpay_payment_id = rpresponse.razorpay_payment_id;
    data.razorpay_signature = rpresponse.razorpay_signature;

    this.shoppingCartService.razorpayPaymentSuccess(data).subscribe(result => {

      this.orderSuccess(result.order_token);
    });

  }



  orderSuccess(token: any) {

    this._ngZone.run(() => {
      this.router.navigate(['/user/order/success'], { queryParams: { 'token': token } });
    });

    this.commonService.openSnackBar('Order Added Successfully');
  }
  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? '';
    metaInfo.meta_description = this.metaData?.meta_description ?? '';
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? '';
    metaInfo.canonical_url = `${this.webURL}` + `/user/billing`;
    this.commonService.setMetaData(metaInfo);
  }



  checkAmountAndPaymentMethod() {

    let grandTotal: number = this.billingInfoData?.cartDetail?.grand_total;
    let paymentInfo = this.paymentMethodInfoData.find(item => item.alias === "razorpay");

    if (paymentInfo != null) {
      let price: number = paymentInfo.price;
      if (price < grandTotal) {
        let defaultMethod = this.paymentMethodInfoData.find(item => item.alias === "purchaseorder");

        this.paymentProceedData.payment_method = defaultMethod != undefined ? defaultMethod : null;
      }
    }

  }
}
