import { Component, OnInit } from '@angular/core';
import { META_DATA } from 'src/app/shared/constants/metadata';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { AppURL } from 'src/app/app-url';

@Component({
    selector: 'app-terms-conditions',
    templateUrl: './terms-conditions.component.html',
    styleUrls: ['./terms-conditions.component.css'],
    standalone: false
})
export class TermsConditionsComponent implements OnInit {

  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['terms-and-conditions'];
  page: string = 'terms-conditions';

  constructor(
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.setMetaData();
  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? '';
    metaInfo.meta_description = this.metaData?.meta_description ?? '';
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? '';

    metaInfo.canonical_url = `${this.webURL}` + `/${this.page}`;
    //og data          
    metaInfo.og_url = `${this.webURL}` + `/${this.page}`;
    metaInfo.og_image = `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    this.commonService.setMetaData(metaInfo);

    //************************// 
    //   Google Tag Manager   //
    //************************//

    this.commonService.gtmPageEvents('Company', 'Company');
  }
}
