import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AdvertisingPageService } from '../advertising-page.service';
import { UserService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-advertising-page-detail',
    templateUrl: './advertising-page-detail.component.html',
    styleUrls: ['./advertising-page-detail.component.css'],
    standalone: false
})
export class AdvertisingPageDetailComponent implements OnInit {

  webURL: string = AppURL.webURL;
  param: any = {};
  isDataLoaded: boolean = false;
  advertisingPageList: any = [];
  productdata: any = [];
  dataList: any[] = [];
  filterData: any[] = [];
  contentList: any[] = [];
  app_svg_icon_list = APP_SVG_ICON_LIST;
  isAuthenticated: boolean = false;
  userDataObs!: Subscription;

  constructor(
    private advertisingPageService: AdvertisingPageService,
    private userService: UserService,
    private router: Router,
    private commonService: CommonService,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) { }


  ngOnInit(): void {

    // set isAuthenticated user 
    this.isAuthenticated = this.userService.isAuthenticated;
    this.userDataObs = this.userService.userData.subscribe(data => {
      this.isAuthenticated = this.userService.isAuthenticated;
    });


    this.route.params.subscribe(params => {
      this.param.slug = params['slug'];
      this.getAdvertisingPageDetail(this.param);
    })
  }


  ngOnDestroy(): void {
    this.userDataObs.unsubscribe();
  }


  getAdvertisingPageDetail(param: any) {

    this.advertisingPageService.advertisingPageDetail(param).subscribe(result => {
      this.isDataLoaded = true;
      if (result != null) {
        this.advertisingPageList = result.data.pageBlock;
        this.productdata = result?.data;
        this.setMetaData();
        this.setSchemaData();
      }
    });
  }

  // open User Login Dialog 
  openUserLoginDialog(productName: any): void {
    this.userService.openUserLoginDialog('Product Listing', productName);
  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.productdata?.meta_title ?? '';
    metaInfo.meta_description = this.productdata?.meta_description ?? '';
    metaInfo.canonical_url = this.productdata?.canonical_url ?? `${this.webURL}` + `${this.router.url}`;
    //og data           
    metaInfo.og_url = `${this.webURL}` + `${this.router.url}`;
    metaInfo.og_image = this.productdata?.image ?? `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    this.commonService.setMetaData(metaInfo);

  }


  splitUrls(fullUrl: any) {
    const pathParts = fullUrl.split("/").filter(Boolean);

    const url1 = pathParts.length >= 2 ? `/${pathParts[0]}/${pathParts[1]}` : '';
    const url2 = fullUrl;

    return { url1, url2 };
  }

  setSchemaData() {
    const currentUrl = this.router.url ?? null;

    const { url1, url2 } = this.splitUrls(currentUrl);

    const name = this.advertisingPageList?.name ?? null;

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": `${name}`,
          "serviceType": "Advertising & Marketing Services",
          "description": `Looking for a reliable ${name} Excellent Publicity provides 360° media planning, ad buying, and campaign execution across print, TV, radio, outdoor, and digital platforms.`,
          "provider": {
            "@type": "Organization",
            "name": "Excellent Publicity",
            "url": "https://www.excellentpublicity.com"
          },
          "category": "Full-Service Advertising Agency",
          "url": `${this.webURL}` + currentUrl
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": `${this.webURL}`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Advertising Services",
              "item": `${this.webURL}` + url1
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": name,
              "item": `${this.webURL}` + url2
            }
          ]
        }
      ]
    };

    let script = this.document.getElementById('schema-advertising') as HTMLScriptElement;
    if (script) {
      script.text = JSON.stringify(schemaData);
    } else {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'schema-advertising';
      script.text = JSON.stringify(schemaData);
      this.document.head.appendChild(script);
    }
  }
}
