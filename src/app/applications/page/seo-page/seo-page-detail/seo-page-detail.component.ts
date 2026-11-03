import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaInformation } from '@app-shared-model';
import { CommonService } from '@app-shared-services';
import { AppURL } from 'src/app/app-url';
import { LandingPageService } from '../../landing-page/landingpage.service';

@Component({
    selector: 'app-seo-page-detail',
    templateUrl: './seo-page-detail.component.html',
    styleUrls: ['./seo-page-detail.component.css'],
    standalone: false
})
export class SeoPageDetailComponent implements OnInit {

  webURL: string = AppURL.webURL;

  hasPageBlock: boolean = false;
  isDataLoaded: boolean = false;
  pageHasData: boolean = false;
  alias: any;
  param: any = {};
  landingPageDetail: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private landingPageService: LandingPageService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.param.alias = params['alias'];
      this.getServicesPageDetail();
    });
  }

  getServicesPageDetail() {

    this.landingPageService.servicesPageDetail(this.param).subscribe(result => {
      this.isDataLoaded = true;

      if (result.status == true) {
        this.pageHasData = true;

        this.landingPageDetail = result.data;

        // this.hasPageBlock = this.landingPageDetail.pageBlock.length > 0 ? true:false;
        this.setMetaData();
      }
      else {
        this.landingPageDetail = [];
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

    let alias = this.param.alias[0].toUpperCase() + this.param.alias.slice(1).toLowerCase();
    this.commonService.gtmPageEvents('Services Detail', alias);
  }
}
