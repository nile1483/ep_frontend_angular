import { Component, Inject, OnInit, DOCUMENT } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NewspaperService } from '@app-media-services';
import { AppURL } from 'src/app/app-url';
import { UserService } from 'src/app/shared/services/user.service';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { C2A_TITLE_DATA } from '@app-shared-constants';
import { Subscription } from 'rxjs';
import { Meta } from '@angular/platform-browser';


@Component({
    selector: 'app-newspaper-detail-page',
    templateUrl: './newspaper-detail-page.component.html',
    styleUrls: ['./newspaper-detail-page.component.css'],
    standalone: false
})
export class NewspaperDetailPageComponent implements OnInit {

  media: string = 'newspaper';
  webURL: string = AppURL.webURL;
  callToActionData: CallToAction = { title: C2A_TITLE_DATA[this.media], inquiryUser: {} };
  userDataObs!: Subscription;
  alias: string = '';
  mediaDetail: any = false;
  pageDescription: boolean = false;
  isAuthenticated: boolean = false;
  isDataLoaded: boolean = false;
  search_string: string = '';

  selectedCurrency: any;
  footerLinkData: any;

  constructor(
    private _srCurrentMedia: NewspaperService,
    private userService: UserService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.route.params.subscribe((x) => {
      this.alias = x['alias'] || '';
    });
  }


  ngOnInit(): void {
    //Currency
    this.selectedCurrency = this.commonService.getSelectedCurrency();
    this.commonService.getCurrency().subscribe(currency => {
      this.selectedCurrency = this.commonService.getSelectedCurrency();
    });

    this.setPrimaryData();
  }

  // getMediaDetail() {
  //   this._srCurrentMedia.getMediaDetail(this.alias).subscribe(result => {
  //     this.isDataLoaded = true;
  //     if (result.status == true) {
  //       this.mediaDetail = result.data;
  //       this.pageDescription = result.description;
  //       this.callToActionData.inquiryUser = this.mediaDetail?.inquiryUser;
  //       this.setMetaData();
  //     }

  //     //************ GTM ************//
  //     this.commonService.gtmPageEvents('Product Detail', 'Newspaper');
  //   })
  // }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.mediaDetail?.meta_title ?? '';
    metaInfo.meta_description = this.mediaDetail?.meta_description ?? '';
    metaInfo.meta_keywords = this.mediaDetail?.meta_keywords ?? '';
    metaInfo.canonical_url = this.mediaDetail?.canonical_url ?? `${this.webURL}` + `${this.router.url}`;

    //og data       
    metaInfo.og_url = `${this.webURL}` + `${this.router.url}`;
    metaInfo.og_image = this.mediaDetail?.image ?? `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    this.commonService.setMetaData(metaInfo);
  }

  setSchemaData() {
    const currentUrl = this.router.url ?? null;
    const name = this.mediaDetail?.name ?? null;
    const publicationName = this.mediaDetail?.publications ?? null;
    const city = this.mediaDetail?.location?.[0]?.city ?? null;
    const searchString = this.mediaDetail?.location?.[0]?.search_string ?? null;
    const state = this.mediaDetail?.location?.[0]?.state ?? null;
    const country = this.mediaDetail?.location?.[0]?.country ?? 'India';

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": `Newspaper Advertising on ${name}`,
          "serviceType": "Newspaper Advertising",
          "description": `Place your ad in ${publicationName}, a popular local newspaper in ${city}. Excellent Publicity provides ad booking, design support, and placement in prime positions to maximize visibility and response.`,
          "provider": {
            "@type": "Organization",
            "name": "Excellent Publicity",
            "url": "https://www.excellentpublicity.com"
          },
          "areaServed": {
            "@type": "Place",
            "name": `${searchString}`
          },
          "category": "Print Advertising",
          "url": `${this.webURL}` + currentUrl
        },
        {
          "@type": "Place",
          "name": city,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": city,
            "addressRegion": state,
            "addressCountry": country
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item":""
            }
        ]
      },
      ]
    };

    let script = this.document.getElementById('schema-newspaper') as HTMLScriptElement;
    if (script) {
      script.text = JSON.stringify(schemaData);
    } else {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'schema-newspaper';
      script.text = JSON.stringify(schemaData);
      this.document.head.appendChild(script);
    }
  }

  openAddToPlanDialog(price: any): void {
    this.userService.openAddToPlanDialog(this.mediaDetail, price);
  }

  openPriceOnRequestDialog(price: any): void {
    let formData: any = this.mediaDetail;
    formData["priceRequest"] = price;
    this.userService.openPriceOnRequestDialog(formData);
  }

  // set Primary Data
  setPrimaryData() {
    // set isAuthenticated user 
    this.isAuthenticated = this.userService.isAuthenticated;
    this.userDataObs = this.userService.userData.subscribe(data => {
      this.isAuthenticated = this.userService.isAuthenticated;
    });

    (this.isAuthenticated) ? this.getOffersForUser() : this.getOffersForGuest();
  }

  // open User Login Dialog 
  openUserLoginDialog(productName: any): void {
    this.userService.openUserLoginDialog('Product Detail', productName);
  }

  ngOnDestroy(): void {
    this.userDataObs.unsubscribe();
  }


  //type process
  offersData: any[] = [];
  selectedAdType: any = 'classified_text_ads';
  isOfferDisplay: boolean = false;

  filterOfferList: any[] = [];
  isOfferNotFound: boolean = false;

  selectedCategory: string = 'none';
  selectedAdTypeByCategoriesList: any[] = [];
  isCatagoryList: boolean = false;

  selectedCategoryByOfferList: any[] = [];
  filterOfferSelectedCategoryByEditionList: any[] = [];
  isEditionList: boolean = false;
  selectedEditions: any[] = [];

  selectedEditionByOffersList: any = [];

  getOffersForUser() {
    this._srCurrentMedia.getOfferListForUser(this.alias).subscribe(result => {
      this.setData(result);
    });
  }

  getOffersForGuest() {
    this._srCurrentMedia.getOfferListForGuest(this.alias).subscribe(result => {
      this.setData(result);
    });
  }

  setData(result: any) {
    this.isDataLoaded = true;
    this.offersData = result?.offer ?? [];
    this.mediaDetail = result?.item ?? false;
    this.pageDescription = result?.description;
    this.footerLinkData = result?.footerLinkData;
    this.callToActionData.inquiryUser = this.mediaDetail?.inquiryUser;
    this.setMetaData();
    this.setSchemaData();

    this.changeAdsControl(this.selectedAdType);

    // if (result.status == false) {
    //   this.commonService.subSearchsite.next(this.search_string);
    // }

    //************ GTM ************//
    this.commonService.gtmPageEvents('Product Detail', 'Newspaper');
  }



  changeAdsControl(adType: any) {

    this.selectedAdType = adType;

    this.filterOfferList = [];
    this.isOfferNotFound = false;
    this.isOfferDisplay = false;

    this.selectedCategory = '';
    this.selectedAdTypeByCategoriesList = [];
    this.isCatagoryList = false;

    this.selectedEditions = [];
    this.selectedEditionByOffersList = [];
    this.isEditionList = false;

    if (this.offersData.length == 0) {
      this.isOfferNotFound = true;
      return;
    }

    this.filterOfferList = this.getFilteredAdtypeByOffers();
    this.selectedAdTypeByCategoriesList = this.getFilteredOfferByCategories();

    if (this.selectedAdTypeByCategoriesList.length > 0) {
      this.isCatagoryList = true;
    }
  }


  getFilteredAdtypeByOffers() {
    let offerTemp = [];
    offerTemp = this.offersData.filter(offer => offer.ad_type === this.selectedAdType);
    return offerTemp;
  }


  getFilteredOfferByCategories() {
    let categoryTemp: any[] = [];
    this.filterOfferList.forEach(offer => {
      offer.categories.forEach((category: any) => {
        if (categoryTemp.findIndex(o => o.name === category.name) < 0) {
          categoryTemp.push(category);
        }
      });
    });
    return categoryTemp;
  }


  changeCategory(category: any) {
    this.selectedCategoryByOfferList = [];
    this.filterOfferSelectedCategoryByEditionList = [];
    this.selectedEditionByOffersList = [];
    this.selectedEditions = [];
    this.isEditionList = false;
    this.isOfferDisplay = false;

    this.selectedCategory = category.name;
    this.selectedCategoryByOfferList = this.getOffersFilteredBySelectedCategory();
    this.filterOfferSelectedCategoryByEditionList = this.getFilteredSelectedCategoryByEditions();
    if (this.filterOfferSelectedCategoryByEditionList.length > 0) {
      this.isEditionList = true;
    }
  }


  getOffersFilteredBySelectedCategory() {
    var offerTemp: any = [];
    this.filterOfferList.forEach(element => {
      element.categories.forEach((category: any) => {
        if (category.name == this.selectedCategory) {
          offerTemp.push(element)
        }
      });
    });
    return offerTemp;
  }


  getFilteredSelectedCategoryByEditions() {
    var editionsTemp: any = [];
    this.selectedCategoryByOfferList.forEach(offer => {
      offer.editions.forEach((edition: any) => {
        var isExist = editionsTemp.some(function (e: any) { return e.name === edition.name });
        if (!isExist) {
          editionsTemp.push({ name: edition.name, checked: false });
        }
      });
    });
    return editionsTemp;
  }


  changeEdition(event: any, edition: any) {

    if (event.currentTarget.checked == true) {
      this.selectedEditions.push(edition);
    }
    else {
      this.selectedEditions.splice(this.selectedEditions.indexOf(edition), 1);
    }

    this.selectedEditionByOffersList = this.getOffersFilteredBySelectedEdition();
    if (this.selectedEditionByOffersList.selected.length > 0) {
      this.isOfferDisplay = true;
    }
    else {
      this.isOfferDisplay = false;
    }
  }


  getOffersFilteredBySelectedEdition() {

    var offerFilteredByEditionSelected: any[] = [];
    var offerFilteredByEditionSelectedOption: any = [];
    var offerFilteredListByEdition: any = {};

    this.selectedCategoryByOfferList.forEach(element => {
      element.editions.forEach((offerEdition: any) => {
        this.selectedEditions.forEach(value => {

          if (offerEdition.name == value.name && offerFilteredByEditionSelected.findIndex(o => o.offer_name === element.offer_name) < 0) {
            offerFilteredByEditionSelected.push(element);
          }
        });
      });
    });

    this.selectedCategoryByOfferList.forEach(element => {
      if (offerFilteredByEditionSelected.findIndex(o => o.id === element.id) < 0) {
        offerFilteredByEditionSelectedOption.push(element);
      }
    });

    offerFilteredListByEdition.selected = offerFilteredByEditionSelected;
    offerFilteredListByEdition.selectOption = offerFilteredByEditionSelectedOption;

    return offerFilteredListByEdition;
  }



  composeProcess(offer: any) {

    let offerId = offer.id;
    let adType = offer.ad_type;

    // let mainUrl = 'http://192.168.1.21:4203/offer/'; //Local
    let mainUrl = 'https://www.excellentpublicity.com/newspaperapp/offer/'; //Live

    let finalUrl: any;

    if (adType == 'classified_text_ads') {
      finalUrl = mainUrl + offerId + '/compose-textad-main';
    }
    else if (adType == 'classified_display_ads') {
      finalUrl = mainUrl + offerId + '/compose-classified-displayad-main';
    }
    else if (adType == 'display_ads') {
      finalUrl = mainUrl + offerId + '/compose-displayad-main';
    }

    window.open(finalUrl, '_self');

  }

}
