import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
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
  selector: 'app-manual-payment',
  templateUrl: './manual-payment.component.html',
  styleUrl: './manual-payment.component.css'
})
export class ManualPaymentComponent {

  token: string = '';
  app_svg_icon_list = APP_SVG_ICON_LIST;


  paymentDetails: any = {};
  paymentSuccessData: any = {};
  hasPaymentData: boolean = false;
  hasPaymentSuccess: boolean = false;
  hasPaymentFail: boolean = false;
  isLoded: boolean = false;
  rzp_orderId: any = '';

  constructor(
    private shoppingCartService: ShoppingCartService,
    private commonService: CommonService,
    private loaderService: LoaderService,
    private userService: UserService,
    private winRef: WindowRefService,
    private route: ActivatedRoute,
    private _ngZone: NgZone,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] ?? false;
      this.getPaymentDetails(this.token);
    });

    this.loadScript('https://checkout.razorpay.com/v1/checkout.js');

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


  getPaymentDetails(token: string) {

    this.loaderService.open();

    this.shoppingCartService.getManualPaymentDetails(token).subscribe(response => {
      this.loaderService.close();
      this.isLoded = true;
      if (response.status == true) {
        this.paymentDetails = response.data;

        this.paymentDetails.charge_amount = +(this.paymentDetails.amount * 2.36 / 100).toFixed(2);
        this.paymentDetails.final_amount  = +(this.paymentDetails.amount + this.paymentDetails.charge_amount).toFixed(2);

        this.hasPaymentData = true;
      }
    });
  }



  paymentProceed() {

    this.paymentDetails.payment_method = "razorpay";

    let serviceData: any = [];
    serviceData['formData'] = this.paymentDetails;
    this.loaderService.open();

    this.shoppingCartService.manualPaymentProceed(serviceData).subscribe(response => {
      this.loaderService.close();
      if (response.payment_method == "razorpay") {
        this.rzp_orderId = response.id;
        this.payWithRazor(this.rzp_orderId);
      }
    });
  }


  // razorpay(response: any) {
  //   this.rzp_orderId = response.data.razorpay_order_id;
  //   this.payWithRazor(response.id);
  // }


  payWithRazor(val: any) {
    const options: any = {
      //key: 'rzp_test_3DVU4m50KmZpH3',
      //amount: 125500, // amount should be in paise format to display Rs 1255 without decimal point
      ///currency: 'INR',
      name: 'Excellent publicity', // company name or product name
      //description: 'Gujarat',  // product description
      image: 'https://www.excellentpublicity.com/assets/logo/excellent-logo-color.png', // company logo or product image
      order_id: val, // order_id created by you in backend
      // prefill: {
      //   name: this.userInfo?.name,
      //   email: this.userInfo?.email,
      //   contact: this.userInfo?.contact
      // },
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
      let response: any = {};
      response.message = "dismiss modal";
      // this.handle_payment_fail_response(response);
      // handle the case when user closes the form while transaction is in progress
    });

    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();

    rzp.on('payment.failed', (response: any) => {
      this.handle_payment_fail_response(response.error);
      rzp.close();
    });
    
  }


  handle_payment_success_response(rpresponse: any) {

    let data: any = {};
    data.payment_link_id = this.paymentDetails.id;
    data.final_amount = this.paymentDetails.final_amount;
    data.razorpay_order_id = this.rzp_orderId;
    data.razorpay_payment_id = rpresponse.razorpay_payment_id;
    data.razorpay_signature = rpresponse.razorpay_signature;

    this.shoppingCartService.manualPaymentSuccess(data).subscribe(result => {
      if (result.status) {
        this._ngZone.run(() => {
          this.router.navigate(['/manualpaymentsuccess'], { queryParams: { 'token': result.data.token } });
        });
      }
      this.changeDetectorRef.detectChanges();
    });

  }


  handle_payment_fail_response(response: any) {
    let data: any = {};
    data.response = response;
    data.payment_link_id = this.paymentDetails.id;
    data.razorpay_order_id = this.rzp_orderId;

    this.shoppingCartService.manualPaymentFail(data).subscribe(result => {
      if (!result.status) {
        this._ngZone.run(() => {
          this.router.navigate(['/manualpaymentfail'], { queryParams: { 'token': result.data.token } });
        });
      }
      this.changeDetectorRef.detectChanges();
    });
  }


}
