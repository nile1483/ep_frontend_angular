import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TelevisionService } from '@app-media-services';
import { AppURL } from 'src/app/app-url';
import { UserService } from 'src/app/shared/services/user.service';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { C2A_TITLE_DATA } from '@app-shared-constants';
import { Subscription } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-television-detail-page',
  templateUrl: './television-detail-page.component.html',
  styleUrls: ['./television-detail-page.component.css']
})
export class TelevisionDetailPageComponent implements OnInit {

  media: string = 'television';
  webURL: string = AppURL.webURL;
  callToActionData: CallToAction = { title: C2A_TITLE_DATA[this.media], inquiryUser: {} };
  userDataObs!: Subscription;

  alias: string = '';
  mediaDetail: any = false;
  pageDescription: boolean = false;
  isAuthenticated: boolean = false;
  isDataLoaded: boolean = false;
  search_string: string = '';

  selectedCurrency: any;
  footerLinkData: any;

  constructor(
    private _srCurrentMedia: TelevisionService,
    private userService: UserService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
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
        this.pageDescription = result.description;
        this.footerLinkData = result.footerLinkData;
        this.callToActionData.inquiryUser = this.mediaDetail?.inquiryUser;
        this.setMetaData();
        this.setSchemaData();

        if (this.mediaDetail?.index_this_page_in_google === "No") {
          this.meta.addTag({ name: 'robots', content: 'noindex' });
        }
      }
      else {
        this.commonService.subSearchsite.next(this.search_string);
      }

      //************ GTM ************//
      this.commonService.gtmPageEvents('Product Detail', 'Television');

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

  setSchemaData() {
    
    const currentUrl = this.router.url ?? null;
    const name = this.mediaDetail?.name ?? null;
    const language = this.mediaDetail?.language ?? null;

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Television Advertising on ${name}`,
      "serviceType": "Television Advertising",
      "description": `Advertise on ${name}, a popular TV channel in ${language}. Excellent Publicity offers ad slot booking, media planning, and execution to maximize your campaign reach.`,
      "provider": {
        "@type": "Organization",
        "name": "Excellent Global Endeavors LLP",
        "url": "https://www.excellentpublicity.com"
      },
      "category": "TV Advertising",
      "url": `${this.webURL}` + currentUrl
    };

    let script = this.document.getElementById('schema-television') as HTMLScriptElement;
    if (script) {
      script.text = JSON.stringify(schemaData);
    } else {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'schema-television';
      script.text = JSON.stringify(schemaData);
      this.document.head.appendChild(script);
    }
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
  openUserLoginDialog(productName: any): void {
    this.userService.openUserLoginDialog('Product Detail', productName);
  }

  ngOnDestroy(): void {
    this.userDataObs.unsubscribe();
  }

}
