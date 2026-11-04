import { Component, ChangeDetectionStrategy } from '@angular/core';
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
    selector: 'app-realestate-advertising-page',
    templateUrl: './realestate-advertising-page.component.html',
    styleUrl: './realestate-advertising-page.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class RealEstateAdvertisingPageComponent {

  media: string = 'realestateadvertising';
  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['realestateadvertising'];
  selectedCurrency: any;
  pageContentData: any;

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['realestateadvertising'], inquiryUser: {} };

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

      if (this.isAuthenticated && this.router.url == '/industry-insights/real-estate-advertising') {
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
      "question": "What are the latest trends in the real estate sector?",
      "answer": "Sustainable housing, smart homes, co-living spaces, and digital property transactions are shaping the industry."
    },
    {
      "question": "How has real estate advertising evolved over the years?",
      "answer": "From print and outdoor ads to digital, influencer marketing, and AI-driven campaigns, real estate promotions have gone digital-first."
    },
    {
      "question": "Which advertising medium works best for real estate marketing?",
      "answer": "A mix of digital ads, print, outdoor billboards, and television ensures maximum visibility and lead generation."
    },
    {
      "question": "What role does digital marketing play in real estate?",
      "answer": "It enhances reach, builds credibility, and generates high-intent leads through SEO, PPC, and social media campaigns."
    },
    {
      "question": "Why is branding important in the real estate industry?",
      "answer": "Strong branding builds trust, attracts investors, and differentiates a property from competitors."
    },
    {
      "question": "What are the key challenges in real estate advertising?",
      "answer": "High competition, buyer skepticism, regulatory compliance, and balancing traditional vs. digital marketing strategies."
    },
    {
      "question": "How does transit media help in real estate promotions?",
      "answer": "Bus wraps, metro ads, and airport displays provide high visibility and reach potential buyers on the go."
    },
    {
      "question": "How important is video marketing in real estate?",
      "answer": "Virtual tours, drone shots, and walkthrough videos help buyers visualize properties, boosting engagement and conversions."
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
    this.userService.openUserLoginDialog('Product Detail', 'Realestate Advertising');
  }


  download() {
    window.open(this.industryInsightsUrl + '/' + this.media + '/download')
  }

}
