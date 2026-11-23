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
      "question": "Which advertising medium had the highest share of real estate advertising in September 2026?",
      "answer": "Radio had the highest share, accounting for 20.4% of all radio advertising seconds in September 2026. Digital followed with a 2% share, while print accounted for 3.6% and television for 0.4% of their respective advertising volumes."
    },
    {
      "question": "Which digital platforms were most preferred for real estate advertising?",
      "answer": "Facebook Display led with 43.7% of estimated digital spend, followed by Mobile Video at 32.3%, Mobile Display at 15.8%, Twitter Display at 3% and Desktop Video at 3.8%."
    },
    {
      "question": "How has video advertising grown in the real estate sector?",
      "answer": "Mobile video impressions increased significantly, rising from 11.9% in September 2025 to 28.5% in September 2026. This indicates a growing preference for video-led digital campaigns among real estate advertisers."
    },
    {
      "question": "Which Indian states recorded the highest real estate radio advertising activity?",
      "answer": "Rajasthan led with 21.4% of real estate radio advertising seconds, followed by Maharashtra at 16.9% and Gujarat at 16.2%."
    },
    {
      "question": "How did print advertising perform in the real estate sector?",
      "answer": "Print advertising declined by 46.2% in terms of column space compared to August 2026. The Times of India led with a 19.3% share of real estate print advertising, followed by Dainik Bhaskar at 13.7%."
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
