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
  selector: 'app-ims-report-page',
  templateUrl: './ims-report-page.component.html',
  styleUrl: './ims-report-page.component.css'
})
export class ImsReportPageComponent {

  media: string = 'imsreport';
  webURL: string = AppURL.webURL;
  industryInsightsUrl: string = AppURL.industryInsightsUrl;
  media_icons: any = SVG_ICON_FOR_MEDIA
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  app_svg_icon_list = APP_SVG_ICON_LIST;
  metaData: any = META_DATA['imsreport'];
  selectedCurrency: any;
  pageContentData: any;

  callToActionData: CallToAction = { title: C2A_TITLE_DATA['imsreport'], inquiryUser: {} };

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

      if (this.isAuthenticated && this.router.url == '/media-insights/ims-report') {
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
      "question": "What effect does the shift of advertising spending across different media have?",
      "answer": "The advertising industry moves toward digital platforms because consumers now prefer to access content through online channels. Digital advertising now accounts for more than 50% of India's total advertising expenditures because its current market share matches the combined total of traditional media. The integrated approach has become the preferred method for advertisers because it enables them to connect with their complete target audience through various advertising platforms."
    },
    {
      "question": "Why is cross media strategy crucial for the advertisers?",
      "answer": "The average Indian consumes approximately 2.5 different media types every month while they use multiple screens simultaneously throughout their daily activities. Brands develop their advertising campaigns through various media platforms, which include television and digital channels, social media, over-the-top services, and regional television stations to reach more viewers and create better audience interaction."
    },
    {
      "question": "What advertising options are now available in India due to the rise in the population that uses digital?",
      "answer": "There are more than nine hundred million users online (many on mobile). This offers more possibilities for companies to measure and reach out with their ads effectively, because of the growth of the smartphone market and being able to do so across many channels of digital media (videos, ads placed on social networks, search engines, and through mobile devices)."
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
    this.userService.openUserLoginDialog('Product Detail', 'IMS Report');
  }


  download() {
    window.open(this.industryInsightsUrl + '/' + this.media + '/download')

  }

}
