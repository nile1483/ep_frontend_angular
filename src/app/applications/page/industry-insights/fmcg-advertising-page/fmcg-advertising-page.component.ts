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
    selector: 'app-fmcg-advertising-page',
    templateUrl: './fmcg-advertising-page.component.html',
    styleUrl: './fmcg-advertising-page.component.css',
    standalone: false
})
export class FmcgAdvertisingPageComponent {

  media: string = 'fmcgadvertising';
  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['fmcgadvertising'];
  selectedCurrency: any;
  pageContentData: any;

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['fmcgadvertising'], inquiryUser: {} };

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

      if (this.isAuthenticated && this.router.url == '/industry-insights/fmcg-advertising') {
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
      "question": "How to choose the right media for my FMCG brand's advertising campaign?",
      "answer": "Focus on a mix of traditional and digital platforms, ensuring your message reaches both mass and tech-savvy audiences."
    },
    {
      "question": "What role does seasonality play in FMCG advertising?",
      "answer": "Seasonal peaks, like festivals and summer months, are ideal for boosting reach and sales, especially during high-demand periods."
    },
    {
      "question": "How can FMCG brands benefit from influencer marketing?",
      "answer": "Influencers help amplify brand awareness and build trust with specific consumer groups, driving engagement and product interest."
    },
    {
      "question": "Is print media still effective for FMCG advertising?",
      "answer": "Yes, print remains valuable for reaching a wide audience, particularly in local and regional markets, and is effective for sales promotions."
    },
    {
      "question": "How important is digital advertising for the FMCG sector?",
      "answer": "Digital advertising is key for connecting with younger, digitally-savvy consumers and helps in precise targeting and measurable outcomes."
    },
    {
      "question": "What type of content works best for FMCG campaigns?",
      "answer": "Informative, engaging, and relatable content—like product demonstrations, user reviews, and promotions works well with consumers."
    },
    {
      "question": "How can FMCG brands measure the success of their ad campaigns?",
      "answer": "Track metrics like brand awareness, consumer engagement, sales growth, and return on investment (ROI) to measure the effectiveness of campaigns."
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
    this.userService.openUserLoginDialog('Product Detail', 'FMCG Advertising');
  }


  download() {
    window.open(this.industryInsightsUrl + '/' + this.media + '/download')
  }

}
