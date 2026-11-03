import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddToPlanDialogComponent } from '@app-media-shared-components';
import { CommonService } from 'src/app/shared/services/common.service';
import { LocalstorageService } from 'src/app/shared/services/localstorage.service';
import { ShoppingCartService } from '@app-media-services';
import { UserService } from 'src/app/shared/services/user.service';
import { MetaInformation } from '@app-shared-model';
import { APP_SVG_ICON_LIST, META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    standalone: false
})
export class CartComponent implements OnInit {

  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['cart'];

  app_svg_icon_list = APP_SVG_ICON_LIST;

  cartData: any = [];
  currencyTotals: any = [];
  isAuthenticated: boolean = false;
  name = new UntypedFormControl('');
  userDataObs!: Subscription;

  campaignForm = new UntypedFormGroup({
    campaignName: new UntypedFormControl('', Validators.required)
  });

  couponCodeMsg: string = '';
  isCouponCodeValid: boolean = false;
  isCheckCouponCodeReq: boolean = false;
  couponCodeData: any = null;
  discountAmount: number = 0;

  couponCodeForm = new UntypedFormGroup({
    code: new UntypedFormControl('', Validators.required)
  });

  constructor(
    private shoppingCartService: ShoppingCartService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    public commonService: CommonService,
  ) {

    this.isAuthenticated = this.userService.isAuthenticated;
    this.userDataObs = this.userService.userData.subscribe(data => {
      this.isAuthenticated = this.userService.isAuthenticated;
    });
  }

  get campaignName() {
    return this.campaignForm.get('campaignName')?.value || null;
  }

  ngOnInit() {
    this.setMetaData();
    this.getLastCampaignList();
  }

  getLastCampaignList() {
    this.shoppingCartService.shoppingCartLastCampaignList().subscribe(result => {
      if (result.status == true) {
        this.cartData = result.data;
        this.currencyTotals = result.data.currencyTotals;

        this.createCampaignName();

        //discount amount changed
        if (this.discountAmount > 0) {
          this.discountAmount = this.setDiscountAmount();
        }
      }
      else {
        this.cartData = [];
        this.currencyTotals = [];
      }
    });
  }

  createCampaignName() {
    if (this.cartData.items.length > 0) {
      let cartId = this.cartData.id;

      let data = this.cartData.items;
      let mediaName = data[0].media;
      let createName = 'Campaign' + cartId + mediaName;

      this.campaignForm.setValue({ campaignName: createName });
    }
  }

  deleteItem(itemId: number) {
    let serviceData: any = [];
    serviceData['itemId'] = itemId;

    // this.loaderService.open();

    this.shoppingCartService.shoppingCartItemRemove(serviceData).subscribe(result => {
      // this.loaderService.close();
      this.getLastCampaignList();
      this.shoppingCartService.updateShoppingCartData();
      this.commonService.openSnackBar('Item Delete Successfully');

    });

  }

  editItem(index: number) {
    this.shoppingCartService.isEditCart = true;
    const dialogRef = this.dialog.open(AddToPlanDialogComponent, {
      data: this.cartData[index],
      width: '750px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.shoppingCartService.isEditCart = false;
    });
  }



  saveCampaign() {

    this.campaignForm.markAllAsTouched();

    if (!this.campaignForm.valid) {
      return;
    }

    let campaignData = this.setShoppingCartData();

    let serviceData: any = [];
    serviceData['formData'] = campaignData;

    this.shoppingCartService.shoppingCartUpdate(serviceData).subscribe(result => {

      if (result.status == true) {
        this.shoppingCartService.updateShoppingCartData();

        if (result.status == true) {
          this.commonService.openSnackBar('Campaign Saved Successfully');
          this.router.navigate(['/user/campaign']);
        }
      }
    });
  }

  orderCampaign() {

    this.campaignForm.markAllAsTouched();

    if (!this.campaignForm.valid) {
      return;
    }

    let campaignData = this.setShoppingCartData();

    let serviceData: any = [];
    serviceData['formData'] = campaignData;

    this.shoppingCartService.shoppingCartUpdate(serviceData).subscribe(result => {

      if (result.status == true) {

        let campaignId = result.data.id;
        this.shoppingCartService.updateShoppingCartData();

        if (result.status == true) {
          this.router.navigate(['/user/billing', campaignId]);
        }

      }
    });
  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? '';
    metaInfo.meta_description = this.metaData?.meta_description ?? '';
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? '';
    metaInfo.canonical_url = `${this.webURL}` + `/user/cart`;
    this.commonService.setMetaData(metaInfo);
  }

  setShoppingCartData() {

    let setCampaignData: any = {};
    setCampaignData.campaign_name = this.campaignForm.value.campaignName;
    setCampaignData.cart_id = this.cartData.id;
    setCampaignData.discount_amount = this.discountAmount;
    setCampaignData.additional_information = this.couponCodeData;

    return setCampaignData;
  }

  ngOnDestroy(): void {
    this.userDataObs.unsubscribe();
  }

  checkCouponCode() {

    this.couponCodeForm.markAllAsTouched();

    if (!this.couponCodeForm.valid) {
      return;
    }

    let serviceData: any = [];
    serviceData['formData'] = this.couponCodeForm.value;

    this.isCheckCouponCodeReq = true;

    this.shoppingCartService.checkCouponCodeValid(serviceData).subscribe(result => {

      if (result.status == true) {
        this.isCouponCodeValid = true;
        this.couponCodeMsg = 'Coupon code applied successfully';
        this.couponCodeData = result.data;

        this.discountAmount = this.setDiscountAmount();
      }
      else {
        this.isCouponCodeValid = false;
        this.couponCodeMsg = 'Coupon code is not valid';
        this.couponCodeData = null;
        this.discountAmount = 0;
      }
    });
  }


  setDiscountAmount() {

    let discountTotal = 0;

    if (this.couponCodeData != null) {
      if (this.couponCodeData.discount_type == "percentage") {
        discountTotal = (this.cartData.grand_total * this.couponCodeData.discount_amount) / 100;
      }

      if (this.couponCodeData.discount_type == "fixed") {
        discountTotal = this.couponCodeData.discount_amount;
      }

      if (discountTotal >= this.cartData.grand_total) {
        discountTotal = this.cartData.grand_total;
        // this.isCouponCodeValid = false;
        // this.couponCodeMsg = 'sssss';
        // this.couponCodeData = null;
      }
    }

    return discountTotal;
  }

}
