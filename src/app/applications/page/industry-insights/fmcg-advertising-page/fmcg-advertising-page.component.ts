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
  selector: 'app-fmcg-advertising-page',
  templateUrl: './fmcg-advertising-page.component.html',
  styleUrl: './fmcg-advertising-page.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
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
      "question": "Which FMCG segment saw the biggest growth in digital advertising?",
      "answer": "Hair care was a major growth segment. Its share of FMCG digital spending increased from 4.1% to 14.3%, driven by brands such as Indulekha and Streax."
    },
    {
      "question": "Which FMCG category led digital advertising?",
      "answer": "Perfumes and deodorants topped the digital sub-category rankings with 10.3% of FMCG digital spending, up from 6.2% a year earlier."
    },
    {
      "question": "Which digital platform received the highest FMCG advertising activity?",
      "answer": "Facebook Display accounted for 81.1% of FMCG digital impressions, compared to 58.3% a year earlier. This shows how strongly FMCG digital advertising depends on one platform."
    },
    {
      "question": "Which states led FMCG radio advertising?",
      "answer": "Uttar Pradesh led with 26.7% of FMCG radio ad seconds, followed by Gujarat at 24.5%. Together, the two states accounted for just over half of FMCG radio advertising."
    },
    {
      "question": "Why was September 2026 different from September 2025 for FMCG advertising?",
      "answer": "September 2025 coincided with the start of Navratri and GST 2.0 price cuts on several FMCG products. In 2026, Navratri began in October, making September a pre-festive month rather than a festive one."
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
