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
  selector: 'app-personal-care-page',
  templateUrl: './personal-care-page.component.html',
  styleUrl: './personal-care-page.component.css'
})
export class PersonalCarePageComponent {
  media: string = 'personalcareadvertising';
  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['personalcareadvertising'];
  selectedCurrency: any;
  pageContentData: any;

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['personalcareadvertising'], inquiryUser: {} };

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
      "question": "How much do personal care brands typically spend on advertising?",
      "answer": "Personal care brands often allocate 8–20% of their revenue towards advertising, especially during product launches and festive seasons."
    },
    {
      "question": "Which media channels are most effective for personal care advertising?",
      "answer": "Print, digital, and influencer marketing lead the way for high engagement, while radio helps build recall in regional markets."
    },
    {
      "question": "What role does digital marketing play for personal care products?",
      "answer": "Digital drives awareness, engagement, and conversions via product demos, reviews, influencer collabs, and targeted performance marketing."
    },
    {
      "question": "How can I pick the right media mix for my personal care brand?",
      "answer": "Understanding your audience’s habits a hybrid strategy across print, social media, and regional platforms usually delivers great results."
    },
    {
      "question": "Why is branding crucial for personal care products?",
      "answer": "In a crowded market, trust, aesthetics, and emotional connection are key branding ensures your product stands out and stays relevant."
    },
    {
      "question": "What are the biggest challenges in personal care advertising?",
      "answer": "Fierce competition, changing consumer preferences, and cluttered messaging standing out requires creativity and consistency."
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
