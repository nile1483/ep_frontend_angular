import { Component, Inject, OnInit, DOCUMENT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LandingPageService } from '../landingpage.service';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { AppURL } from 'src/app/app-url';


@Component({
    selector: 'app-landing-page-detail',
    templateUrl: './landing-page-detail.component.html',
    styleUrls: ['./landing-page-detail.component.css'],
    standalone: false
})
export class LandingPageDetailComponent implements OnInit {
  webURL: string = AppURL.webURL;

  hasPageBlock: boolean = true;
  alias: any;
  media: any;
  segment: any;
  param: any = {};
  landingPageDetail: any = [];
  isDataLoaded: boolean = false;
  search_string: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private landingPageService: LandingPageService,
    private commonService: CommonService,
    @Inject(DOCUMENT) private document: Document
  ) {

  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.param.alias = params['alias'];
      this.param.media = params['media'];
      this.param.segment = params['segment'];
      this.search_string = this.param.media + ' ' + this.param.segment + ' ' + this.param.alias;
      this.search_string.trim();
      this.getLandingPageDetail();

    });

  }

  getLandingPageDetail() {

    this.landingPageService.landingPageDetail(this.param).subscribe(result => {
      this.isDataLoaded = true;

      if (result.status == true) {
        this.landingPageDetail = result.data;
        this.hasPageBlock = this.landingPageDetail.pageBlock.length > 0 ? true : false;
        this.setMetaData();
        this.setSchemaData();
      }
      else {
        this.commonService.subSearchsite.next(this.search_string);
      }

    });
  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.landingPageDetail?.meta_title ?? '';
    metaInfo.meta_description = this.landingPageDetail?.meta_description ?? '';
    metaInfo.meta_keywords = this.landingPageDetail?.meta_keywords ?? '';
    metaInfo.canonical_url = `${this.webURL}` + `${this.router.url}`;
    this.commonService.setMetaData(metaInfo);

    //************************// 
    //   Google Tag Manager   //
    //************************//

    let media = this.param.media[0].toUpperCase() + this.param.media.slice(1).toLowerCase();
    this.commonService.gtmPageEvents('LP Detail', media);
  }


  splitUrls(fullUrl: any) {
    const pathParts = fullUrl.split("/").filter(Boolean);

    const url1 = pathParts.length >= 2 ? `/${pathParts[0]}/${pathParts[1]}` : '';
    const url2 = fullUrl;

    return {url1, url2 };
  }


  setSchemaData() {
    const currentUrl = this.router.url ?? null;

    const { url1, url2 } = this.splitUrls(currentUrl);

    const name = this.landingPageDetail?.name ?? null;

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

    let script = this.document.getElementById('schema-media') as HTMLScriptElement;
    if (script) {
      script.text = JSON.stringify(schemaData);
    } else {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'schema-media';
      script.text = JSON.stringify(schemaData);
      this.document.head.appendChild(script);
    }
  }
}
