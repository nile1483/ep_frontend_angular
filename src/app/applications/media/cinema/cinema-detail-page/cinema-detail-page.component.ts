import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CinemaService } from '@app-media-services';

import { UserService } from 'src/app/shared/services/user.service';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { C2A_TITLE_DATA } from '@app-shared-constants';
import { Subscription } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-cinema-detail-page',
  templateUrl: './cinema-detail-page.component.html',
  styleUrls: ['./cinema-detail-page.component.css']
})
export class CinemaDetailPageComponent implements OnInit {

  media: string = 'cinema';
  webURL: string = AppURL.webURL;
  callToActionData: CallToAction = { title: C2A_TITLE_DATA[this.media], inquiryUser: {} };
  userDataObs!: Subscription;

  alias: string = '';
  search_string: string = '';
  mediaDetail: any = false;
  pageDescription: boolean = false;
  isAuthenticated: boolean = false;
  isDataLoaded: boolean = false;

  selectedCurrency: any;
  footerLinkData: any;

  constructor(
    private _srCurrentMedia: CinemaService,
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
      this.commonService.gtmPageEvents('Product Detail', 'Cinema');
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
    const city = this.mediaDetail?.location?.[0]?.city ?? null;
    const searchString = this.mediaDetail?.location?.[0]?.search_string ?? null;
    const state = this.mediaDetail?.location?.[0]?.state ?? null;
    const country = this.mediaDetail?.location?.[0]?.country ?? 'India';

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": `Cinema Advertising on ${name}`,
          "serviceType": "Cinema Advertising",
          "description": `Advertise on ${name}, a leading in ${city}. Reach a large and engaged audience with Excellent Publicity's end-to-end radio ad booking, planning, and campaign execution services.`,
          "provider": {
            "@type": "Organization",
            "name": "Excellent Publicity",
            "url": "https://www.excellentpublicity.com"
          },
          "areaServed": {
            "@type": "Place",
            "name": `${searchString}`
          },
          "category": "Cinema Advertising",
          "url": `${this.webURL}` + currentUrl
        },
        {
          "@type": "Place",
          "name": city,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": city,
            "addressRegion": state,
            "addressCountry": country
          }
        }
      ]
    };

    let script = this.document.getElementById('schema-cinema') as HTMLScriptElement;
    if (script) {
      script.text = JSON.stringify(schemaData);
    } else {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'schema-cinema';
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
    this.isAuthenticated = this.userService.isAuthenticated;
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
