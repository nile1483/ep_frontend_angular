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
  selector: 'app-agriculture-farming-advertising-page',
  templateUrl: './agriculture-farming-advertising-page.component.html',
  styleUrl: './agriculture-farming-advertising-page.component.css'
})
export class AgricultureFarmingAdvertisingPageComponent {
  media: string = 'agriculturefarmingadvertising';
  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['agriculturefarmingadvertising'];
  selectedCurrency: any;
  pageContentData: any;

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['agriculturefarmingadvertising'], inquiryUser: {} };

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
      
      if (this.isAuthenticated && this.router.url == '/industry-insights/personal-care') {
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
      "question": "How much do agriculture and farming brands spend on advertising annually?",
      "answer": "Agri-based companies typically allocate 4–10% of their revenue towards advertising, with a focus on regional and rural outreach."
    },
    {
      "question": "Which are the most effective media channels for agriculture advertising?",
      "answer": "Print media leads the way, especially in rural areas. Radio and regional language newspapers also perform well, while digital is emerging for B2B targeting."
    },
    {
      "question": "What role does digital marketing play in promoting agricultural products?",
      "answer": "Digital marketing helps in reaching progressive farmers, agri-dealers, and rural influencers through WhatsApp campaigns, YouTube explainers, and mobile app ads."
    },
    {
      "question": "How do I choose the right advertising medium for my agri brand?",
      "answer": "Understand your target geography (rural vs urban) and product lifecycle. For mass awareness, go with print and radio; for tech-based solutions, include digital."
    },
    {
      "question": "Why is branding important in the agriculture sector?",
      "answer": "In a trust-driven market, strong branding builds product credibility, loyalty, and helps differentiate from local competitors and generic options."
    },
    {
      "question": "What are the key challenges in agriculture advertising?",
      "answer": "Challenges include seasonal demand, language diversity, low digital penetration in rural areas, and the need for education-based messaging for new agri-tech products."
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
    this.userService.openUserLoginDialog('Product Detail', 'Personal Care Advertising');
  }


  download() {
    window.open(this.industryInsightsUrl + '/' + this.media + '/download')
  }
}
