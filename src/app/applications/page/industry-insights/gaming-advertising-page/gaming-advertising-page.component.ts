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
    selector: 'app-gaming-advertising-page',
    templateUrl: './gaming-advertising-page.component.html',
    styleUrl: './gaming-advertising-page.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class GamingAdvertisingPageComponent {

  media: string = 'gamingadvertising';
  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['gamingadvertising'];
  selectedCurrency: any;
  pageContentData: any;

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['gamingadvertising'], inquiryUser: {} };

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

      if (this.isAuthenticated && this.router.url == '/industry-insights/gaming-advertising') {
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
      "question": "What are the latest trends in the gaming & betting sector?",
      "answer": "Live streaming, in-game advertising, blockchain-based betting, and AI-driven personalization are key trends shaping the industry."
    },
    {
      "question": "How has gaming & betting advertising evolved over the years?",
      "answer": "From traditional TV and print ads to influencer collaborations, programmatic advertising, and immersive AR/VR promotions, the industry has adapted to digital-first marketing."
    },
    {
      "question": "Which advertising medium works best for gaming & betting marketing?",
      "answer": "A mix of digital ads, influencer partnerships, TV spots, and live-streaming sponsorships ensures maximum engagement and brand recall."
    },
    {
      "question": "What role does digital marketing play in gaming & betting?",
      "answer": "It boosts reach, builds credibility, and generates high-intent leads through SEO, PPC, social media, and content marketing."
    },
    {
      "question": "Why is branding important in the gaming & betting industry?",
      "answer": "Strong branding fosters trust, attracts new users, and creates a loyal player base in a highly competitive market."
    },
    {
      "question": "What are the key challenges in gaming & betting advertising?",
      "answer": "Regulatory restrictions, platform limitations, competition, and responsible gambling policies present key marketing challenges."
    },
    {
      "question": "How does influencer marketing help gaming & betting promotions?",
      "answer": "Gamers, streamers, and betting influencers help drive credibility and reach through live streams, social media content, and gaming communities."
    },
    {
      "question": "How important is video marketing in gaming & betting?",
      "answer": "Trailer ads, in-game footage, and live gameplay demonstrations increase player engagement and boost conversion rates."
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
    this.userService.openUserLoginDialog('Product Detail', 'Gaming Advertising');
  }


  download() {
    window.open(this.industryInsightsUrl + '/' + this.media + '/download')
  }

}
