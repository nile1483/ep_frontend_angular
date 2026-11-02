import { Component, OnInit } from '@angular/core';
import { AdvertisingPageService } from '../advertising-page.service';
import { AppURL } from 'src/app/app-url';
import { META_DATA } from '@app-shared-constants';
import { MetaInformation } from '@app-shared-model';
import { CommonService } from '@app-shared-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advertising-page-list',
  templateUrl: './advertising-page-list.component.html',
  styleUrls: ['./advertising-page-list.component.css']
})
export class AdvertisingPageListComponent implements OnInit {

  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['advertising'];

  advertisingPageList: any = [];
  isDataLoaded: boolean = false;

  href: any = "";

  constructor(
    private advertisingPageService: AdvertisingPageService,
    private commonService: CommonService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.href = this.router.url;

    this.setMetaData();
    this.getAllAdvertisingPage();
  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? '';
    metaInfo.meta_description = this.metaData?.meta_description ?? '';
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? '';
    metaInfo.canonical_url = `${this.webURL}` + `${this.router.url}`;
    //og data          
    metaInfo.og_url = `${this.webURL}`;
    metaInfo.og_image = `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    this.commonService.setMetaData(metaInfo);

    //************************// 
    //   Google Tag Manager   //
    //************************//

    this.commonService.gtmPageEvents('Company', 'Advertising Page');
  }

  getAllAdvertisingPage() {
    this.advertisingPageService.advertisingPageList().subscribe(result => {
      this.isDataLoaded = true;
      this.advertisingPageList = result?.data ?? [];
    });
  }
}