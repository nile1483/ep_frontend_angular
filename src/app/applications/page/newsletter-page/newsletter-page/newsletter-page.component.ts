import { Component } from '@angular/core';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsletter-page',
  templateUrl: './newsletter-page.component.html',
  styleUrl: './newsletter-page.component.css'
})
export class NewsletterPageComponent {

  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['newsletter'];

  constructor(
    private router: Router,
    private commonService: CommonService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.setMetaData();
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

    this.commonService.gtmPageEvents('Company', 'Newsletter Page');
  }
}