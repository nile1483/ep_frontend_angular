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
  selector: 'app-personal-health-care-page',
  templateUrl: './personal-health-care-page.component.html',
  styleUrl: './personal-health-care-page.component.css'
})
export class PersonalHealthCarePageComponent {
  media: string = 'personalhealthcareadvertising';
  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['personalhealthcareadvertising'];
  selectedCurrency: any;
  pageContentData: any;

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['personalhealthcareadvertising'], inquiryUser: {} };

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
      
      if (this.isAuthenticated && this.router.url == '/industry-insights/personal-health-care') {
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
      "question": "How much do personal healthcare brands typically spend?",
      "answer": "Spends vary by product category, but FMCG healthcare brands generally allocate 8–20% of revenue to marketing efforts."
    },
    {
      "question": "Which media platforms work best for personal healthcare advertising?",
      "answer": "Digital and print are the most effective, especially for urban audiences, while radio performs well in regional markets."
    },
    {
      "question": "How effective is influencer and content marketing in this space?",
      "answer": "Very effective. Trusted voices and user-generated content drive awareness and build product credibility, especially for OTC and skincare."
    },
    {
      "question": "Why is brand storytelling important in healthcare?",
      "answer": "Because personal healthcare is emotional and trust-based storytelling humanizes the brand and builds a loyal customer base."
    },
    {
      "question": "What challenges do brands face in this sector?",
      "answer": "Regulatory constraints, credibility issues, and fierce competition from both legacy and D2C brands."
    },
    {
      "question": "How do you measure success in personal healthcare sector?",
      "answer": "Metrics like brand recall, engagement, ROI, and uplift in purchase intent are key performance indicators."
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
    this.userService.openUserLoginDialog('Product Detail', 'Personal Health Care Advertising');
  }


  download() {
    window.open(this.industryInsightsUrl + '/' + this.media + '/download')
  }
}
