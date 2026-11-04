import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '@app-shared-services';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SearchComponent implements OnInit {
  webURL: string = AppURL.webURL;
  search_string: string = "";
  search_result: any = [];
  meta_string: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
  ) {

    const queryParams = this.route.snapshot.queryParams;

    if (queryParams['q'] && queryParams['q'].length > 0) {
      this.search_string = queryParams['q'];
    }
    else {
      this.search_string = "";
    } 
  }

  ngOnInit(): void {
     
    this.route.params.subscribe((x) => {
       
    })
    
    if (this.search_string.length > 2) {
      this.meta_string = this.search_string + " : Excellent Publicity";
    } else {
      this.search_string = "";
      this.meta_string = "No Results : Excellent Publicity";
    }
    this.setMetaData();
  }

  ngAfterViewInit(): void {
    this.commonService.subSearchsite.next(this.search_string);        
  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.meta_string ?? '';
    metaInfo.meta_description = this.meta_string ?? '';
    // metaInfo.canonical_url = `${this.webURL}` + `/${this.router.url}`;
    metaInfo.canonical_url = `${this.webURL}` + `/search`;
    //og data          
    metaInfo.og_url = `${this.webURL}` + `/${this.router.url}`;
    metaInfo.og_image = `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    this.commonService.setMetaData(metaInfo);
    //************************// 
    //   Google Tag Manager   //
    //************************//

     this.commonService.gtmPageEvents('Company', 'Company'); 

  }


}
