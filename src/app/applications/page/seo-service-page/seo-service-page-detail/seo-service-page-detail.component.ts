import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SEO_SERVICE_META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { MetaInformation } from '@app-shared-model';
import { CommonService } from '@app-shared-services';

@Component({
  selector: 'app-seo-service-page-detail',
  templateUrl: './seo-service-page-detail.component.html',
  styleUrls: ['./seo-service-page-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class SeoServicePageDetailComponent implements OnInit {

  type: string = '';
  metaData: any;
  webURL: string = AppURL.webURL;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public commonService: CommonService
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe((x) => {
      this.type = x['type'] || '';

      this.metaData = SEO_SERVICE_META_DATA[this.type];

      this.setMetaData();
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

    this.commonService.gtmPageEvents('Company', 'Corporate Gifting Detail Page');
  }

}