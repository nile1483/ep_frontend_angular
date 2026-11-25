import { Component, ChangeDetectionStrategy } from '@angular/core';
import { C2A_TITLE_DATA } from '@app-shared-constants';
import { MEDIA_INSIGHTS_META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { CommonService, UserService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { MatDialog } from '@angular/material/dialog';
import { PageService } from '../../page.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-outdoor-advertising-page',
  templateUrl: './outdoor-advertising-page.component.html',
  styleUrl: './outdoor-advertising-page.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class OutdoorAdvertisingPageComponent {

  media: string = 'outdooradvertising';

  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  metaData: any = MEDIA_INSIGHTS_META_DATA['outdooradvertising'];

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['outdooradvertising'], inquiryUser: {} };

  userDataObs!: Subscription;
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private commonService: CommonService,
    public dialog: MatDialog,
    private pageService: PageService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {

    // set isAuthenticated user 
    this.isAuthenticated = this.userService.isAuthenticated;
    this.userDataObs = this.userService.userData.subscribe(data => {
      this.isAuthenticated = this.userService.isAuthenticated;

      // if (this.isAuthenticated && this.router.url == '/media-insights/outdoor-advertising') {
      //   this.download();
      // }
    });

    this.setMetaData();
    this.getPageData();
  }

  getPageData() {
    this.pageService.getIndustryInsightsAdvertisingPageData(this.media).subscribe(result => {
      if (result.status == true) {
        this.callToActionData.inquiryUser = result.data?.inquiryUser;
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

    this.commonService.gtmPageEvents('Company', 'Outdoor Advertising');
  }



  faqList = [
    {
      "question": "How much do brands invest in outdoor advertising annually?",
      "answer": "Budgets vary based on industry and location. Major brands allocate a significant share to billboards, transit ads, and digital OOH."
    },
    {
      "question": "Which sectors benefit most from outdoor advertising?",
      "answer": "Real Estate, Retail, FMCG, and Consumer Services gain the highest visibility and conversions from OOH advertising."
    },
    {
      "question": "How does digital integration enhance outdoor advertising?",
      "answer": "DOOH, geotargeting, and QR-based interactions create an omnichannel experience, blending outdoor ads with digital engagement."
    },
    {
      "question": "What are the biggest challenges in outdoor advertising?",
      "answer": "High rental costs, location availability, and compliance regulations require strategic planning for an effective campaign."
    }
  ];


  handleDownloadClick(event: Event) {

    if (!this.isAuthenticated) {
      this.openUserLoginDialog();
    } else {
      this.download();
    }
  }


  // open User Login Dialog 
  openUserLoginDialog() {
    this.userService.openUserLoginDialog('Product Detail', 'Outdoor Advertising');
  }


  download() {
    window.open(this.industryInsightsUrl + '/' + this.media + '/download')
  }

}
