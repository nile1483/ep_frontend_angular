import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { AppURL } from 'src/app/app-url';
import { META_DATA } from '@app-shared-constants';

@Component({
    selector: 'app-sitemap',
    templateUrl: './sitemap.component.html',
    styleUrls: ['./sitemap.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SitemapComponent implements OnInit {
  webURL : string = AppURL.webURL;
  page : string = 'sitemap';
  metaData : any = META_DATA['sitemap']; 
  constructor(
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
    metaInfo.canonical_url = `${this.webURL}`+ `/${this.page}`; 
    //og data          
    metaInfo.og_url = `${this.webURL}`+ `/${this.page}`;       
    metaInfo.og_image = `${this.webURL}`+ '/assets/logo/excellent-logo-footer.webp';     
    this.commonService.setMetaData(metaInfo); 

     //************************// 
    //   Google Tag Manager   //
    //************************//

    this.commonService.gtmPageEvents('Company', 'Company'); 
 }
}
