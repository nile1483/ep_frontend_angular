import { Component } from '@angular/core';
import { SERVICE_LIST_WITH_SVG_ICON, APP_SVG_ICON_LIST, SVG_ICON_FOR_MEDIA, C2A_TITLE_DATA } from '@app-shared-constants';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { MatDialog } from '@angular/material/dialog';
import { PageService } from '../../page.service';
import { Router } from '@angular/router';
import { UserService } from '@app-shared-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hospitality-page',
  templateUrl: './hospitality-page.component.html',
  styleUrl: './hospitality-page.component.css'
})
export class HospitalityPageComponent {
  media: string = 'hospitalityadvertising';
  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['hospitalityadvertising'];
  selectedCurrency: any;
  pageContentData: any;

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['hospitalityadvertising'], inquiryUser: {} };

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
      
      if (this.isAuthenticated && this.router.url == '/industry-insights/hospitality-sector') {
        this.download();
      }
    });

    this.setMetaData();
    this.getPageData();
  }

  getPageData() {
    this.pageService.getIndustryInsightsAdvertisingPageData(this.media).subscribe(result => {
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

    this.commonService.gtmPageEvents('Company', 'Company');
  }



  faqList = [
    {
      "question": "How much do hotels and resorts typically spend on advertising?",
      "answer": "Hospitality brands often allocate 5–12% of their annual revenue to marketing and ad campaigns, especially during seasonal peaks."
    },
    {
      "question": "Which are the most effective advertising channels for the hospitality sector?",
      "answer": "Print, outdoor/transit, and digital (especially display and video ads) remain the top-performing mediums for reaching travel-ready audiences."
    },
    {
      "question": "What role does digital marketing play in the hospitality industry?",
      "answer": "From performance campaigns to retargeting travelers, digital marketing builds engagement and drives direct bookings with measurable ROI."
    },
    {
      "question": "How do I choose the right advertising strategy for my hotel or resort?",
      "answer": "Focus on audience behavior, booking cycles, and destination trends a combination of print, digital, and influencer partnerships often works best."
    },
    {
      "question": "Why is branding essential in hospitality?",
      "answer": "A strong brand helps build trust, loyalty, and premium perception all key in a crowded travel marketplace."
    },
    {
      "question": "What are the biggest challenges in hospitality advertising?",
      "answer": "Seasonal demand shifts, price competition, and maintaining consistency across channels are ongoing hurdles."
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
    this.userService.openUserLoginDialog('Product Detail', 'Hospitality Advertising');
  }


  download() {
    window.open(this.industryInsightsUrl + '/' + this.media + '/download')
  }
}
