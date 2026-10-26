import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppURL } from 'src/app/app-url';

@Component({
    selector: 'app-media-insights-list-page',
    templateUrl: './media-insights-list-page.component.html',
    styleUrl: './media-insights-list-page.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class MediaInsightsListPageComponent {

  webURL: string = AppURL.webURL;

  faqList = [
    {
      "question": "What does Media Insights mean?",
      "answer": "Media Insights analyzes the audience behavior across all media types, like print, TV, digital, radio, and OTT. This way, Advertisers can send messages through the right channel to the right audience at the right time.",
    },
    {
      "question": "What is the process of Excellent Publicity in media industry analysis?",
      "answer": "We implement detailed media insight projects along with audience research and trend analysis that provide actionable strategies for brands that are navigating the media agency landscape.",
    },
    {
      "question": "What is the importance of media insight reports for strategic planning?",
      "answer": "Reports that map engagement across platforms, guides brands in their opportunity identification, optimizes campaigns, and yields measurable results.",
    },
  ];

  
  cards = [
    {
      link: '/media-insights/print-advertising-report',
      image: 'assets/page/media-insights/list/print.png',
      title: 'Print',
      description: ''
    },
    {
      link: '/media-insights/digital-advertising-report',
      image: 'assets/page/media-insights/list/digital.png',
      title: 'Digital',
      description: ''
    },
    {
      link: '/media-insights/radio-advertising-report',
      image: 'assets/page/media-insights/list/radio.png',
      title: 'Radio',
      description: ''
    },
    {
      link: '/media-insights/television-advertising-report',
      image: 'assets/page/media-insights/list/television.png',
      title: 'Television',
      description: ''
    },
    {
      link: '/media-insights/ims-report',
      image: 'assets/page/media-insights/list/ims-report.png',
      title: 'IMS Report',
      description: ''
    },
  ];

}