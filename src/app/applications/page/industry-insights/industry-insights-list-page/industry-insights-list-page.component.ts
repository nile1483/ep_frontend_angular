import { Component } from '@angular/core';
import { AppURL } from 'src/app/app-url';
import { MetaInformation } from '@app-shared-model';
import { META_DATA } from '@app-shared-constants';
import { CommonService } from '@app-shared-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-industry-insights-list-page',
  templateUrl: './industry-insights-list-page.component.html',
  styleUrl: './industry-insights-list-page.component.css',
})
export class IndustryInsightsListPageComponent {

  webURL: string = AppURL.webURL;

  metaData: any = META_DATA['industry-insights'];

  faqList = [
    {
      "question": "What Are Industry Insights?",
      "answer": "These are analytical reports that highlight evolving industry trends, ad spend behavior, and market directions, helping brands craft strategies rooted in evidence.",
    },
    {
      "question": "How do such detailed reports benefit the business?",
      "answer": "They highlight where and how industries are spending, enabling smarter decisions, optimized budgets, and higher campaign efficiency.",
    },
    {
      "question": "What are the consulting insights in these reports?",
      "answer": "They’re expert interpretations of advertising data that guide how brands should act, spend, and strategize in response to market changes",
    },
  ];

  cards = [
    {
      link: '/industry-insights/jewellery-advertising',
      image: 'assets/page/industry-insights/list/jewellary.png',
      title: 'Jewellery Industry',
      description: ''
    },
    {
      link: '/industry-insights/education-advertising',
      image: 'assets/page/industry-insights/list/education.png',
      title: 'Education Industry',
      description: ''
    },
    {
      link: '/industry-insights/real-estate-advertising',
      image: 'assets/page/industry-insights/list/real-estate.png',
      title: 'Real Estate Industry',
      description: ''
    },
    {
      link: '/industry-insights/fmcg-advertising',
      image: 'assets/page/industry-insights/list/fmcg.png',
      title: 'FMCG Industry',
      description: ''
    },
    {
      link: '/industry-insights/gaming-advertising',
      image: 'assets/page/industry-insights/list/gaming.png',
      title: 'Gaming Industry',
      description: ''
    },
    {
      link: '/industry-insights/automobile-advertising-report',
      image: 'assets/page/industry-insights/list/automobile.png',
      title: 'Automobile Industry',
      description: ''
    },
    {
      link: '/industry-insights/e-commerce-advertising',
      image: 'assets/page/industry-insights/list/e-commerce.png',
      title: 'E – Commerce Industry',
      description: ''
    },
    {
      link: '/industry-insights/lifestyle-and-apparel-advertising-report',
      image: 'assets/page/industry-insights/list/lifestyle.png',
      title: 'Lifestyle & Apparel Industry',
      description: ''
    },
    {
      link: '/industry-insights/financial-services-advertising-report',
      image: 'assets/page/industry-insights/list/financial-services.png',
      title: 'Financial Services Industry',
      description: ''
    },
    {
      link: '/industry-insights/packaged-rice-advertising-report',
      image: 'assets/page/industry-insights/list/packaged-rice.png',
      title: 'Packaged Rice Industry',
      description: ''
    },
    {
      link: '/industry-insights/renewable-energy-sector',
      image: 'assets/page/industry-insights/list/renewable-energy.png',
      title: 'Renewable Energy Industry',
      description: ''
    },
    {
      link: '/industry-insights/tourism-industry',
      image: 'assets/page/industry-insights/list/travel-tourism.png',
      title: 'Travel & Tourism Industry',
      description: ''
    },
    {
      link: '/industry-insights/hospitality-sector',
      image: 'assets/page/industry-insights/list/hospitality.png',
      title: 'Hospitality Industry',
      description: ''
    },
    {
      link: '/industry-insights/personal-care',
      image: 'assets/page/industry-insights/list/personal-care.png',
      title: 'Personal Care',
      description: ''
    },
    {
      link: '/industry-insights/personal-healthcare',
      image: 'assets/page/industry-insights/list/personal-healthcare.png',
      title: 'Personal Healthcare',
      description: ''
    },
    {
      link: '/industry-insights/pharmaceuticals-industry',
      image: 'assets/page/industry-insights/list/pharmaceuticals.png',
      title: 'Pharmaceuticals Industry',
      description: ''
    },
    {
      link: '/industry-insights/agriculture-farming-industry',
      image: 'assets/page/industry-insights/list/agriculture-farming.png',
      title: 'Agriculture & Farming Industry',
      description: ''
    },
    {
      link: '/industry-insights/food-sector',
      image: 'assets/page/industry-insights/list/food-sector.png',
      title: 'Food Sector Industry',
      description: ''
    },
    {
      link: '/industry-insights/petcare-tam-report',
      image: 'assets/page/industry-insights/list/petcare-tam.png',
      title: 'Petcare TAM',
      description: ''
    },
    {
      link: '/industry-insights/ipl-tam-report',
      image: 'assets/page/industry-insights/list/ipl-tam.png',
      title: 'IPL TAM',
      description: ''
    },
  ];

  constructor(
    private router: Router,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.setMetaData();
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

    this.commonService.gtmPageEvents('Company', 'Industry Insights');
  }

}