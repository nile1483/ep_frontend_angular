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
    selector: 'app-education-advertising-page',
    templateUrl: './education-advertising-page.component.html',
    styleUrl: './education-advertising-page.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class EducationAdvertisingPageComponent {

  media: string = 'educationadvertising';
  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['educationadvertising'];
  selectedCurrency: any;
  pageContentData: any;

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['educationadvertising'], inquiryUser: {} };

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

      if (this.isAuthenticated && this.router.url == '/industry-insights/education-advertising') {
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
      "question": "How much do schools and universities spend on advertising annually?",
      "answer": "Institutions typically allocate 5-15% of their revenue towards marketing and advertising efforts."
    },
    {
      "question": "Which are the most effective media channels for education advertising?",
      "answer": "Among all television, print, and transit media have proven most effective for reaching students and parents."
    },
    {
      "question": "What role does digital marketing play in promoting education services?",
      "answer": "Digital marketing ensures targeted reach, boosting student enrollment and brand awareness through SEO, PPC, and social media."
    },
    {
      "question": "How do I choose the right advertising medium for my educational institution?",
      "answer": "Analyze your target audience and budget; a mix of digital and traditional channels often works best."
    },
    {
      "question": "Why is branding important for schools and colleges?",
      "answer": "Strong branding enhances credibility and attracts students by showcasing the institution’s unique offerings."
    },
    {
      "question": "What are the key challenges in education advertising?",
      "answer": "Intense competition, evolving trends, and balancing authenticity with promotional efforts are the main challenges."
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
    this.userService.openUserLoginDialog('Product Detail', 'Education Advertising');
  }


  download() {
    window.open(this.industryInsightsUrl + '/' + this.media + '/download')
  }

}
