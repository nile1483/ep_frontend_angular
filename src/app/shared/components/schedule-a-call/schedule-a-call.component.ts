import { Component, Inject, PLATFORM_ID, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';

@Component({
  selector: 'app-schedule-a-call',
  templateUrl: './schedule-a-call.component.html',
  styleUrl: './schedule-a-call.component.css',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class ScheduleACallComponent {

  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['schedule-a-call'];

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.setMetaData();

    if (isPlatformBrowser(this.platformId)) {

      // Calendly CSS
      const link = this.renderer.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      this.renderer.appendChild(document.head, link);

      // Calendly Script
      const script = this.renderer.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      this.renderer.appendChild(document.body, script);
    }
  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? '';
    metaInfo.meta_description = this.metaData?.meta_description ?? '';
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? '';
    metaInfo.canonical_url = `${this.webURL} /schedule-a-call`;

    //og data          
    metaInfo.og_url = `${this.webURL}`;
    metaInfo.og_image = `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    this.commonService.setMetaData(metaInfo);

    //************************// 
    //   Google Tag Manager   //
    //************************//

    this.commonService.gtmPageEvents('Company', 'Schedule a Call Page');
  }
}
