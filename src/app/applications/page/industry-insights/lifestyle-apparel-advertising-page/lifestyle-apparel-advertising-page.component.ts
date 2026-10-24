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
  selector: 'app-lifestyle-apparel-advertising-page',
  templateUrl: './lifestyle-apparel-advertising-page.component.html',
  styleUrl: './lifestyle-apparel-advertising-page.component.css'
})
export class LifestyleApparelAdvertisingPageComponent {

  media: string = 'lifestyleandappareladvertising';
  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['lifestyleandappareladvertising'];
  selectedCurrency: any;
  pageContentData: any;

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['lifestyleandappareladvertising'], inquiryUser: {} };

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

      if (this.isAuthenticated && this.router.url == '/industry-insights/lifestyle-and-apparel-advertising-report') {
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
      "question": "How much do brands in the Lifestyle & Apparels sector spend on advertising annually?",
      "answer": "Ad spends vary based on brand size, but companies typically allocate a significant portion of their budget to marketing for maximum reach."
    },
    {
      "question": "Which media channels are most effective for Lifestyle & Apparels advertising?",
      "answer": "A combination of digital, print, and television works best, with digital being the leading platform for consumer engagement."
    },
    {
      "question": "What role does digital marketing play in promoting Lifestyle & Apparels brands?",
      "answer": "Digital marketing enhances brand visibility, drives sales, and builds customer loyalty through social media, influencer marketing, and e-commerce integrations."
    },
    {
      "question": "How do I choose the right advertising medium for my fashion brand?",
      "answer": "Understanding your target audience and budget is key. A mix of online and offline channels ensures broader reach and better ROI."
    },
    {
      "question": "Why is branding crucial for Lifestyle & Apparels companies?",
      "answer": "Strong branding builds credibility, attracts consumers, and differentiates a brand in a competitive marketplace."
    },
    {
      "question": "What are the key challenges in advertising for the Lifestyle & Apparels sector?",
      "answer": "Intense competition, changing consumer behavior, and the need for innovative campaigns to stand out are some of the major challenges."
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
    this.userService.openUserLoginDialog('Product Detail', 'Lifestyle & Apparel Advertising');
  }


  download() {
    window.open(this.industryInsightsUrl + '/' + this.media + '/download')
  }


}
