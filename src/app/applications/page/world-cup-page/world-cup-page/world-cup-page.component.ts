import { Component, OnInit } from '@angular/core';
import { C2A_TITLE_DATA } from '@app-shared-constants';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { WorldCupInquiryDialogComponent } from '../world-cup-inquiry-dialog/world-cup-inquiry-dialogcomponent';
import { MatDialog } from '@angular/material/dialog';
import { PageService } from '../../page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-world-cup-page',
  templateUrl: './world-cup-page.component.html',
  styleUrls: ['./world-cup-page.component.css']
})
export class WorldCupPageComponent implements OnInit {

  media: string = 'worldcup';
  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['world-cup'];
  pageContentData: any;
  callToActionData: CallToAction = { title: C2A_TITLE_DATA['worldcup'], inquiryUser: {} };

  constructor(
    private router: Router,
    private commonService: CommonService,
    public dialog: MatDialog,
    private pageService: PageService,
  ) { }

  ngOnInit(): void {
    this.setMetaData();
    this.getWorldCupPageData();
  }

  getWorldCupPageData() {
    this.pageService.getWorldCupPageData().subscribe(result => {
      if (result.status == true) {
        this.callToActionData.inquiryUser = result.data?.inquiryUser;
        this.pageContentData = result.data;
      }
    });
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

    this.commonService.gtmPageEvents('Company', 'World Cup Page');
  }

  openFormDialog(): void {

    const dialogRef = this.dialog.open(WorldCupInquiryDialogComponent, {
      width: '700px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        //window.location.reload();
      }
    });

  }
}