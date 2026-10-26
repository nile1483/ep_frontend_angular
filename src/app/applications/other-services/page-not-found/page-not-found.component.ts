import { Component, OnInit, Optional, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {  StatusCodeResponseService } from '@app-shared-services';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PageNotFoundComponent implements OnInit {

  webURL: string        = AppURL.webURL;
  search_string: string = "";
  meta_string  : string = "";

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    @Optional() private statusCodeResponseService?: StatusCodeResponseService,
  ) {

    const snapshot = this.route.snapshot.url;     
    if ( snapshot.length > 1) {
      this.search_string = this.commonService.replaceDashWithSpace(snapshot[0].path) + this.commonService.replaceDashWithSpace(snapshot[1].path);
    }
    else {
      this.search_string = this.commonService.replaceDashWithSpace(snapshot[0].path);

    }
     
    
  }

  ngOnInit(): void {
    
    this.statusCodeResponseService?.setNotFound();
    this.meta_string = "Page not found : Excellent Publicity";
    this.setMetaData();
  }

  ngAfterViewInit(): void {
    this.commonService.subSearchsite.next(this.search_string); 
  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.meta_string ?? '';
    this.commonService.setMetaData(metaInfo);
    this.commonService.gtmPageEvents('Company','Company');
 }
  
}
