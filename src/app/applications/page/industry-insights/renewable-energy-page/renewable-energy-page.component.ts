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
    selector: 'app-renewable-energy-page',
    templateUrl: './renewable-energy-page.component.html',
    styleUrl: './renewable-energy-page.component.css',
    standalone: false
})
export class RenewableEnergyPageComponent {

  media: string = 'renewableenergyadvertising';
  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['renewableenergyadvertising'];
  selectedCurrency: any;
  pageContentData: any;

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['renewableenergyadvertising'], inquiryUser: {} };

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

      if (this.isAuthenticated && this.router.url == '/industry-insights/renewable-energy-sector') {
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
      "question": "How much do renewable energy brands spend on advertising annually?",
      "answer": "On average, clean energy companies allocate 6–12% of their revenue towards advertising to drive awareness, investor interest, and public adoption."
    },
    {
      "question": "Which media channels are most effective for green energy promotion?",
      "answer": "Digital platforms, transit media, and industry publications prove most effective in reaching eco-conscious consumers and stakeholders."
    },
    {
      "question": "What role does digital marketing play in renewable energy promotion?",
      "answer": "Digital marketing helps educate the public, highlight product benefits, and promote sustainability efforts via content marketing, influencer outreach, and SEO-driven campaigns."
    },
    {
      "question": "How do I choose the right advertising mix for a renewable brand?",
      "answer": "Identify your audience segment (B2B or B2C), evaluate regional acceptance, and use a blend of digital, OOH, and PR for optimal impact."
    },
    {
      "question": "Why is branding crucial for renewable energy companies?",
      "answer": "In a competitive, future-forward industry, strong branding helps establish trust, innovation credibility, and thought leadership."
    },
    {
      "question": "What are the key challenges in renewable energy advertising?",
      "answer": "Challenges include tackling myths and misinformation, navigating regulatory constraints, and educating diverse audiences on technical aspects and benefits."
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
    this.userService.openUserLoginDialog('Product Detail', 'Renewable Energy Advertising');
  }


  download() {
    window.open(this.industryInsightsUrl + '/' + this.media + '/download')
  }

}
