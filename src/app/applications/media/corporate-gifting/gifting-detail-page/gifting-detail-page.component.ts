import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CorporategiftingService } from '@app-media-services';
import { AppURL } from 'src/app/app-url';
import { UserService } from 'src/app/shared/services/user.service';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { APP_SVG_ICON_LIST, C2A_TITLE_DATA } from '@app-shared-constants';
import { Subscription } from 'rxjs';
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-gifting-detail-page',
    templateUrl: './gifting-detail-page.component.html',
    styleUrls: ['./gifting-detail-page.component.css'],
    standalone: false
})
export class GiftingDetailPageComponent implements OnInit {

  media: string = 'corporategifting';
  webURL: string = AppURL.webURL;
  callToActionData: CallToAction = { title: C2A_TITLE_DATA[this.media], inquiryUser: {} };
  userDataObs!: Subscription;

  alias: string = '';
  mediaDetail: any = false;
  mediaDetailPrice: any = false;
  pageDescription: boolean = false;
  isAuthenticated: boolean = false;
  isDataLoaded: boolean = false;
  search_string: string = '';

  selectedCurrency: any;
  
  app_svg_icon_list = APP_SVG_ICON_LIST;
 

  constructor(
    private _srCurrentMedia: CorporategiftingService,
    private userService: UserService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    private meta: Meta
  ) { }


  ngOnInit(): void {
    //Currency
    this.selectedCurrency = this.commonService.getSelectedCurrency();
    this.commonService.getCurrency().subscribe(currency => {
      this.selectedCurrency = this.commonService.getSelectedCurrency();
    });

    this.route.params.subscribe((x) => {
      this.alias = x['alias'] || '';
      this.search_string = this.commonService.replaceDashWithSpace(this.alias);
      this.setPrimaryData();
      this.getMediaDetail();
    });
  }

  getMediaDetail() {
    this._srCurrentMedia.getMediaDetail(this.alias).subscribe(result => {
      this.isDataLoaded = true;
      if (result.status == true) {
        this.mediaDetail = result.data;
        this.mediaDetailPrice = this.mediaDetail.price[0];
        this.pageDescription = result.description;
        this.callToActionData.inquiryUser = this.mediaDetail?.inquiryUser;
        this.setMetaData();

        if (this.mediaDetail?.index_this_page_in_google === "No") {
          this.meta.addTag({ name: 'robots', content: 'noindex' });
        }
      }
      else {
        this.commonService.subSearchsite.next(this.search_string);
      }

      //************ GTM ************//
      this.commonService.gtmPageEvents('Product Detail', 'Corporate Gifting');

    })
  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.mediaDetail?.meta_title ?? '';
    metaInfo.meta_description = this.mediaDetail?.meta_description ?? '';
    metaInfo.meta_keywords = this.mediaDetail?.meta_keywords ?? '';
    metaInfo.canonical_url = this.mediaDetail?.canonical_url ?? `${this.webURL}` + `${this.router.url}`;

    //og data           
    metaInfo.og_url = `${this.webURL}` + `${this.router.url}`;
    metaInfo.og_image = this.mediaDetail?.image ?? `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    this.commonService.setMetaData(metaInfo);


  }

  openAddToPlanDialog(price: any): void {
    this.userService.openAddToPlanDialog(this.mediaDetail, price);
  }

  openPriceOnRequestDialog(price: any): void {
    let formData: any = this.mediaDetail;
    formData["priceRequest"] = price;
    this.userService.openPriceOnRequestDialog(formData);
  }

  // set Primary Data
  setPrimaryData() {
    // set isAuthenticated user 
    this.isAuthenticated = this.userService.isAuthenticated
    this.userDataObs = this.userService.userData.subscribe(data => {
      this.isAuthenticated = this.userService.isAuthenticated;
    });

  }

  // open User Login Dialog 
  // open User Login Dialog 
  openUserLoginDialog(productName: any): void {
    this.userService.openUserLoginDialog('Product Detail', productName);
  }

  ngOnDestroy(): void {
    this.userDataObs.unsubscribe();
  }


  isSavePrice(priceBreak: any, offerRate: number, priceBreakArray: any) {
    // ((product.price - product.newprice)/product.price)*100
    let highestPriceObject: any = this.getHighestPrice(priceBreakArray);
    let data = ((highestPriceObject.price - priceBreak.price) / offerRate) * 100;
    return data;
  }



  getHighestPrice(dataArray: any)
  {
      // Convert the array into an object
      const dataObject: any = {};
      dataArray.forEach((data: any) => {
        dataObject[data.sort_order] = {
          price: data.price,
          quantity: data.quantity
        };
      });

      // Find the object with the highest price
      let highestPrice = 0;
      let highestPriceObject = null;
      Object.keys(dataObject).forEach(key => {
        const currentPrice = dataObject[key].price;
        if (currentPrice > highestPrice) {
          highestPrice = currentPrice;
          highestPriceObject = dataObject[key];
        }
      });

      return highestPriceObject;
  }
}
