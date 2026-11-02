import { Component, OnInit } from '@angular/core';
import { MetaInformation } from '@app-shared-model';
import { CommonService, HomeService } from '@app-shared-services';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  isloded: boolean = false;
  searchResult: any = [];
  constructor(
    private homeService: HomeService,
    private commonService: CommonService
  ) {

  }

  ngOnInit(): void {
    this.commonService.subSearchsite.subscribe((searchString: string) => {

      if (searchString.length > 2) {
        this.searchSite(searchString);
      }
    });
  }

  searchSite(value: string) {
    let serviceData: any = [];
    serviceData['param'] = { q: value };

    this.homeService.searchSite(serviceData).subscribe((result: any) => {
      this.isloded = true;
      if (result.status == true) {
        this.searchResult = result.data;
      }
      else {
        this.searchResult = [];
      }
    });
  }


}
