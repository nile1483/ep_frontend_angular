import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { PageService } from '../../page.service';
import { AppURL } from 'src/app/app-url';

@Component({
  selector: 'app-country-page-detail',
  templateUrl: './country-page-detail.component.html',
  styleUrl: './country-page-detail.component.css'
})
export class CountryPageDetailComponent {

  webURL: string = AppURL.webURL;

  param: any = {};
  landingPageDetail: any = [];
  isDataLoaded: boolean = false;
  search_string: string = "";
  hasPageBlock: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private pageService: PageService
  ) {
  }


  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.param.region = params['region'];
      this.param.segment = params['segment'];
      this.param.slug = params['slug'];
      this.search_string = this.param.region + ' ' + this.param.segment + ' ' + this.param.slug;
      this.search_string.trim();
      this.getCountryPageDetailDetail();
    });
  }


  getCountryPageDetailDetail() {

    this.pageService.countryPageDetail(this.param).subscribe(result => {
      this.isDataLoaded = true;

      if (result.status == true) {
        this.landingPageDetail = result.data;
        this.hasPageBlock = this.landingPageDetail.pageBlock.length > 0 ? true : false;
        this.setMetaData();
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

    // let media = this.param.media[0].toUpperCase() + this.param.media.slice(1).toLowerCase(); 
    // this.commonService.gtmPageEvents('LP Detail', media);
  }


}
