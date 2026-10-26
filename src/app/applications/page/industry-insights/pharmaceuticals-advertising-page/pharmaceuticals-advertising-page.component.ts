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
    selector: 'app-pharmaceuticals-advertising-page',
    templateUrl: './pharmaceuticals-advertising-page.component.html',
    styleUrl: './pharmaceuticals-advertising-page.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PharmaceuticalsAdvertisingPageComponent {
  media: string = 'pharmaceuticalsadvertising';
  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['pharmaceuticalsadvertising'];
  selectedCurrency: any;
  pageContentData: any;

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['pharmaceuticalsadvertising'], inquiryUser: {} };

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
      
      if (this.isAuthenticated && this.router.url == '/industry-insights/pharmaceuticals-industry') {
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
      "question": "How much do pharmaceutical brands spend on advertising annually?",
      "answer": "Pharmaceutical companies allocate a significant portion of their budget across TV, print, radio, and digital. While exact revenue-based percentages vary, the sector has shown increased focus on print and digital in recent years, with digital alone reaching ₹238 Cr in 2024."
    },
    {
      "question": "Which are the most effective media channels for pharmaceutical advertising?",
      "answer": "Print and digital media lead the way. Print holds a strong presence with high inside-page and color ad placement, while digital platforms like X.com, Facebook, and YouTube see massive ad spends driven mainly by display ads."
    },
    {
      "question": "What role does digital marketing play in promoting pharmaceutical products?",
      "answer": "Digital marketing is essential for targeting urban healthcare consumers, doctors, and e-pharmacy users. With over 900 advertisers, the space sees dominance through display ads, social platforms, and content-driven campaigns."
    },
    {
      "question": "How do I choose the right advertising medium for my pharmaceutical brand?",
      "answer": "Consider your product’s target audience: for traditional credibility and regional penetration, go with print; for scale and B2C or B2B visibility, digital is ideal. TV remains effective during prime time and weekends, especially with celebrity endorsements."
    },
    {
      "question": "Why is brand visibility important in the pharmaceutical sector?",
      "answer": "In a highly competitive market, brand visibility builds trust and recall, especially when celebrity faces like Amitabh Bachchan endorse products. It also influences purchase decisions among both healthcare providers and end consumers."
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
    this.userService.openUserLoginDialog('Product Detail', 'Pharmaceuticals Advertising');
  }


  download() {
    window.open(this.industryInsightsUrl + '/' + this.media + '/download')
  }
}
