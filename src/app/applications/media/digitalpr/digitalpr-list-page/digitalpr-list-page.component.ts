import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';

import { Utilities } from '@app-shared-helpers';
import { UserService } from '@app-shared-services';
import { DigitalprService } from '@app-media-services';
import { LocationParm } from '@app-media-models';
import { DigitalprFilters, DigitalprParams } from '@app-media-models';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { APP_SVG_ICON_LIST, C2A_TITLE_DATA } from '@app-shared-constants';
@Component({
    selector: 'app-digitalpr-list-page',
    templateUrl: './digitalpr-list-page.component.html',
    styleUrls: ['./digitalpr-list-page.component.css'],
    standalone: false
})
export class DigitalprListPageComponent implements OnInit {

  media: string = 'digitalpr';
  webURL: string = AppURL.webURL;
  callToActionData: CallToAction = { title: C2A_TITLE_DATA[this.media], inquiryUser: {} };
  app_svg_icon_list = APP_SVG_ICON_LIST;
  userDataObs!: Subscription;

  params: any = new DigitalprParams();
  tempMobileParams: any = new DigitalprParams();
  mediaFilters: any = new DigitalprFilters();

  pageDescription: any = false;

  isAuthenticated: boolean = false;
  dataList: any[] = [];
  filterList: any = {};
  isShowViewMore: boolean = false;
  isDataLoaded: boolean = false;
  isLoadingMore: boolean = false;
  selectedFilterValues: any[] = [];
  gtmFilterApplied: any[] = [];
  // sorting
  sortingList: any = [];
  selectedSortBy: any = '';

  // location
  isFound: boolean = false;
  locationMessage: string = '';
  selectedLocation: any[] = [];
  locationSearchControl = new UntypedFormControl();
  locationSearchResults: any[] = [];

  // search filter value
  searchGenre: any = '';
  searchLanguage: any = '';
  searchPriceModel: any = '';

  selectedCurrency: any;

  @ViewChildren('accordionRef') accordions !: QueryList<ElementRef>;

  constructor(
    private _srCurrentMedia: DigitalprService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private serializer: UrlSerializer,
    private commonService: CommonService,
    private elementRef: ElementRef,
  ) { }


  ngOnInit(): void {
    //Currency
    this.selectedCurrency = this.commonService.getSelectedCurrency();
    this.commonService.getCurrency().subscribe(currency => {
      this.selectedCurrency = this.commonService.getSelectedCurrency();
    });

    this.params.path = this.router.url;
    this.setPrimaryData();
    this.setApiQueryParams();
  }

  // filter dropdown outside close start------------------------
  handleClickOutside() {
    this.closeAllAccordions();
  }

  closeAllAccordions() {
    this.accordions.forEach((accordion: ElementRef) => {
      this.closeAccordion(accordion);
    });
  }

  closeAccordion(accordion: ElementRef) {
    if (accordion) {
      const accordionElement = accordion.nativeElement;

      const accordionCollapse = accordionElement.querySelector('.accordion-collapse');
      accordionCollapse.classList.remove('show');

      const accordionButton = accordionElement.querySelector('.accordion-button');
      if (accordionButton) {
        accordionButton.classList.add('collapsed');
        accordionButton.setAttribute('aria-expanded', 'false');
      }
    }
  }
  // filter dropdown outside close end------------------------


  // set api query parms for get data on page load
  setApiQueryParams() {
    const queryParams = this.activeRoute.snapshot.queryParams;

    if (!(Object.keys(queryParams).length === 0)) {

      Object.keys(queryParams).forEach(parm => {
        if (this.params.filters.hasOwnProperty(parm)) {
          if (queryParams[parm] instanceof Array) {
            this.params.filters[parm] = queryParams[parm];
          }
          else {
            this.params.filters[parm].push(queryParams[parm]);
          }
        }
      })
    }

    this.getMediaConfigAndList();
  }

  // getting Config data and media List
  getMediaConfigAndList() {

    forkJoin({
      mediaList: this._srCurrentMedia.getMediaList(this.params), // getting
      configData: this._srCurrentMedia.getMediaConfig(),  // getting Config data
    })
      .subscribe(({ mediaList, configData }) => {
        this.setMediaData(mediaList);
        this.setConfigData(configData);
      });
  }

  // set media filters, inquiryUser data, sorting column list, footer inquiry data
  setConfigData(result: any) {
    if (result.status == true) {
      this.filterList = result.data.filters;
      this.callToActionData.inquiryUser = result.data?.inquiryUser;

      // sorting
      this.sortingList = result.data.sorting;
      if (this.sortingList.length > 0) {
        var sort = this.sortingList.filter((sort: any) => {
          return sort.isDefault == true;
        });
        this.selectedSortBy = (sort.length > 0) ? sort[0] : this.sortingList[0];
        this.params.sortBy = this.selectedSortBy.value;
      }
      this.setCheckedFilterValue();
    }
  }

  setMediaData(result: any) {
    this.isDataLoaded = true;
    this.isLoadingMore = false;
    if (result.status == true) {
      this.dataList = (this.dataList.length == 0) ? result.data : [...this.dataList, ...result.data];
      this.isShowViewMore = result.hasmore;
      this.pageDescription = result.description;
      this.setMetaData();
    }
    else {
      this.isShowViewMore = false;
      this.dataList = (this.dataList.length > 0) ? this.dataList : [];
    }
    this.gtmEvents();
  }


  // get media list
  getMediaList() {
    this._srCurrentMedia.getMediaList(this.params).subscribe(result => {
      this.setMediaData(result);
    });
  }

  getFilteredMediaList() {
    this.dataList = [];
    this.params.offset = 0;
    this.isDataLoaded = false;
    this.isShowViewMore = false;
    this.getMediaList();
  }

  // load more data from api
  viewMoreItems() {
    this.params.offset = this.params.offset + this.params.limit;
    this.isLoadingMore = true;
    this.getMediaList();
  }

  //changeSortByValue 
  changeSortByValue(item: any) {
    this.selectedSortBy = item;
    this.params.sortBy = this.selectedSortBy.value;
    let filterString = this.commonService.getGtmFilterString('Sort By', this.selectedSortBy.label);
    this.gtmFilterApplied.push(filterString);

    this.getFilteredMediaList();
  }

  // filter Value Change 
  filterValueChange(event: any, filter: string, value: string) {

    let index = Utilities.findIndexOfFilterValue(this.filterList, filter, value);
    if (event.target.checked) {
      this.filterList[filter].values[index]['checked'] = true;
      let filterString = this.commonService.getGtmFilterString(filter, value)
      this.gtmFilterApplied.push(filterString);
      this.params.filters[filter].push(value);
    }
    else {
      this.filterList[filter].values[index]['checked'] = false;
      this.params.filters[filter].splice(this.params.filters[filter].findIndex((x: any) => x === value), 1);
    }

    this.dataList = [];
    this.params.offset = 0;

    this.setQueryParams();
  }

  // remove selected Filter value
  removeSelectedFilterValue(index: any = false, filter: any = false) {

    if (index == false && filter == false) {
      this.clearAllFilters();

    }
    else {
      let filterName = filter.name;
      this.selectedFilterValues.splice(index, 1);

      if (filter.name != 'location') {
        let vindex = Utilities.findIndexOfFilterValue(this.filterList, filter.name, filter.value);;
        this.filterList[filterName].values[vindex]['checked'] = false;
      }

      this.params.filters[filterName].splice(this.params.filters[filterName].findIndex((x: any) => x == filter.value), 1);

    }

    this.setQueryParams();
  }

  // clear All Filters
  clearAllFilters() {

    this.selectedFilterValues.forEach(f => {
      if (f.name != 'location') {
        let vindex = Utilities.findIndexOfFilterValue(this.filterList, f.name, f.value);;
        let filterName = f.name;
        this.filterList[filterName].values[vindex]['checked'] = false;
      }
    });

    this.params.filters = this.mediaFilters;
    this.selectedFilterValues = [];
    this.gtmFilterApplied = [];
    this.setQueryParams(true);

  }

  // set Applied Filters
  setAppliedFilters() {

    this.selectedFilterValues = [];
    Object.keys(this.params.filters).forEach(filter => {
      this.params.filters[filter].forEach((filterValue: any) => {

        let selectedValue = { name: filter, value: filterValue };

        this.selectedFilterValues.push(selectedValue);
      });
    });
  }

  // set Checked Filter Value
  setCheckedFilterValue() {

    Object.keys(this.params.filters).forEach(filter => {

      this.params.filters[filter].forEach((filterValue: any) => {

        if (filter != 'location') {

          let index = this.filterList[filter].values.findIndex((x: any) => x.name === filterValue);
          if (index >= 0) {
            this.filterList[filter].values[index]['checked'] = true;

            let selectedValue = { name: filter, value: filterValue };
            this.selectedFilterValues.push(selectedValue);
          }
        }
        else {
          let selectedValue = { name: filter, value: filterValue };
          this.selectedFilterValues.push(selectedValue);
        }

      });
    });
  }



  //set Query Parms In url
  setQueryParams(isDelete: Boolean = false) {
    let params: any = {};
    if (isDelete == false) {
      Object.keys(this.params.filters).forEach(param => {
        if (this.params.filters[param].length > 0) {
          params[param] = this.params.filters[param];
        }
      });
    } else {
      Object.keys(this.activeRoute.snapshot.queryParams).forEach(param => {
        params[param] = null;
      });
    }

    this.setAppliedFilters();

    this.router.navigate(['/', this.media], { relativeTo: this.activeRoute, queryParams: params });
    const tree = this.router.createUrlTree([this.media], { queryParams: params });
    this.params.path = this.serializer.serialize(tree);
    this.getFilteredMediaList();
  }


  // geography Data Search from api
  geographyDataSearch(value: any) {
    this.locationSearchResults = [];
    this.locationMessage = '';
    this.isFound = false;

    if (value.length > 2) {
      let serviceData: any = [];
      serviceData['param'] = new LocationParm({ q: value });

      this._srCurrentMedia.searchLocation(serviceData).subscribe((result: any) => {
        if (result.status == true) {
          this.isFound = false;
          this.locationSearchResults = result.data;
        }
        else {
          this.isFound = true;
          this.locationMessage = result.message;
        }
      });
    }
  }


  // set Primary Data
  setPrimaryData() {
    // set isAuthenticated user 
    this.isAuthenticated = this.userService.isAuthenticated
    this.userDataObs = this.userService.userData.subscribe(data => {
      this.isAuthenticated = this.userService.isAuthenticated;
    });

    // set location Search Control subscription
    this.locationSearchControl.valueChanges.subscribe(newValue => {
      if (Utilities.isEmptyObj(newValue.id)) {
        this.geographyDataSearch(newValue);
      } else {
        this.selectedLocation.push(newValue);
        this.locationSearchControl.setValue('');
      }
    });

  }

  // open User Login Dialog 
  // open User Login Dialog 
  openUserLoginDialog(productName: any): void {
    this.userService.openUserLoginDialog('Product Listing', productName);
  }




  // select Location from search Results and get relevent data from api
  selectLocation(location: any, isMobile: boolean = false) {

    this.locationSearchResults = [];
    this.locationSearchControl.setValue('');
    if (!isMobile) {
      this.params.filters['location'].push(location.search_string);
      this.setQueryParams();
    }
    else {

      this.tempMobileParams.filters['location'].push(location.search_string);
    }

  }

  // filter Value Change 
  mobileFilterValueChange(event: any, filter: string, value: string) {

    let index = Utilities.findIndexOfFilterValue(this.filterList, filter, value);
    if (event.target.checked) {
      this.filterList[filter].values[index]['checked'] = true;
      // this.params.filters[filter].push(value);
      this.tempMobileParams.filters[filter].push(value);
    }
    else {
      this.filterList[filter].values[index]['checked'] = false;
      this.tempMobileParams.filters[filter].splice(this.params.filters[filter].findIndex((x: any) => x === value), 1);
    }

  }

  setTempApplyedValue() {
    this.tempMobileParams.filters = this.params.filters;
  }

  applyMobileFilter(isApply: boolean) {

    if (isApply) {

      Object.keys(this.tempMobileParams.filters).forEach((filter: any) => {
        if (this.tempMobileParams.filters[filter].length > 0) {
          if (this.params.filters[filter].length > 0) {

            this.params.filters[filter] = [...new Set([...this.params.filters[filter], ...this.tempMobileParams.filters[filter]])]; //merge two array

          } else {
            this.params.filters[filter] = this.tempMobileParams.filters[filter];
          }
        }
      })
      this.setQueryParams();
    } else {

      Object.keys(this.tempMobileParams.filters).forEach((filter: any) => {
        if (this.tempMobileParams.filters[filter].length > 0) {
          if (filter != 'location') {
            this.tempMobileParams.filters[filter].forEach((filterValue: string) => {
              let index = Utilities.findIndexOfFilterValue(this.filterList, filter, filterValue);
              this.filterList[filter].values[index]['checked'] = false;
            });

          }
        }
      });
    }

    this.tempMobileParams = new DigitalprParams();
  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.pageDescription?.meta_title ?? '';
    metaInfo.meta_description = this.pageDescription?.meta_description ?? '';
    metaInfo.meta_keywords = this.pageDescription?.meta_keywords ?? '';
    // metaInfo.canonical_url = `${this.webURL}` + `${this.router.url}`;
    metaInfo.canonical_url = `${this.webURL}` + `/${this.media}`;

    //og data           
    metaInfo.og_url = `${this.webURL}` + `${this.media}`;
    metaInfo.og_image = `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    metaInfo.custom_page_type = "Product Listing";
    metaInfo.custom_media_type = "diditalpr";

    this.commonService.setMetaData(metaInfo);

  }

  gtmEvents() {
    //************************// 
    //   Google Tag Manager   //
    //************************//

    this.commonService.gtmPageEvents('Product Listing', 'Digitalpr');

    this.gtmFilterApplied.forEach(element => {
      this.commonService.gtmCustomMediaFilterEvents(element);
    });

    this.gtmFilterApplied = [];
  }

  ngOnDestroy(): void {
    this.userDataObs.unsubscribe();
  }

}
