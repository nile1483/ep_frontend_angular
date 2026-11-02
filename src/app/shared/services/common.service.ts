import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppURL } from 'src/app/app-url';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/shared/services/localstorage.service';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  setCurrencyUrl = AppURL.setCurrencyUrl;
  subFooterData = new Subject<any>();
  subSearchsite = new Subject<any>();
  currency = new Subject<any>();
  footerData: any = [];
  footerURL = AppURL.footer;
  selectedcurrency: any = false;

  constructor(
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private meta: Meta,
    private title: Title,
    private gtmService: GoogleTagManagerService,
    private localstorageService: LocalstorageService,
    private cookieService: CookieService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: ['common-snackbar']
    });
  }

  setMetaData(metaInformation: any) {

    if (metaInformation?.meta_title) {
      this.setPageTitle(metaInformation.meta_title);
    }

    if (metaInformation?.meta_description) {
      this.setMetaDescription(metaInformation.meta_description);
    }

    if (metaInformation?.meta_keywords) {
      this.setMetaKeywords(metaInformation.meta_keywords);
    }

    if (metaInformation?.canonical_url) {
      this.createLinkCanonicalURL(metaInformation.canonical_url);
    }

    // Open Graph tag
    if (metaInformation?.og_title != null) {
      this.setOgTitle(metaInformation.og_title);
    } else {
      this.setOgTitle(metaInformation.meta_title);
    }

    if (metaInformation?.og_description != null) {
      this.setOgDescription(metaInformation.og_description);
    }
    else {
      this.setOgDescription(metaInformation.meta_description);
    }

    if (metaInformation?.og_url != null) {
      this.setOgUrl(metaInformation.og_url);
    }
    if (metaInformation?.og_image) {
      this.setOgImage(metaInformation.og_image);
    }



    // twitter tag
    if (metaInformation?.twitter_title != null) {
      this.setTwitterTitle(metaInformation.twitter_title);
    } else {
      this.setTwitterTitle(metaInformation.meta_title);
    }

    if (metaInformation?.twitter_description != null) {
      this.setTwitterDescription(metaInformation.twitter_description);
    }
    else {
      this.setTwitterDescription(metaInformation.meta_description);
    }

    if (metaInformation?.twitter_url != null) {
      this.setTwitterUrl(metaInformation.twitter_url);
    }
    if (metaInformation?.twitter_image) {
      this.setTwitterImage(metaInformation.twitter_image);
    }


  }

  setPageTitle(title: string) {
    this.title.setTitle(title);
  }

  setMetaDescription(description: string) {
    this.meta.addTag({ name: 'description', content: description });
  }

  setMetaKeywords(keywords: string) {
    this.meta.addTag({ name: 'keywords', content: keywords });
  }

  createLinkCanonicalURL(canonical_url: string) {

    var element = this.document.querySelector(`link[rel='canonical']`) as HTMLLinkElement;
    if (element == null) {
      element = this.document.createElement('link') as HTMLLinkElement;
      this.document.head.appendChild(element);
    }
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', canonical_url);

  }

  userLoginFormActive() {
    // tab-registration
    const tab1 = this.document.getElementById('tab-1');
    const tabRegistration = this.document.getElementById('tab-registration');

    tab1?.classList.remove('active');
    tab1?.setAttribute('aria-selected', 'false');

    tabRegistration?.classList.remove('active');
    tabRegistration?.classList.remove('show');
    // tab-login
    const tab2 = this.document.getElementById('tab-2');
    const tabLogin = this.document.getElementById('tab-login');

    tab2?.classList.add('active');
    tab2?.setAttribute('aria-selected', 'true');

    tabLogin?.classList.add('active');
    tabLogin?.classList.add('show');


  }

  closeLoginModal() {
    this.closeBootstrapModal('loginModal');
  }

  closeBootstrapModal(modalId: string) {
    // get modal
    const modal = this.document.getElementById(modalId);
    // change state like in hidden modal
    modal?.classList.remove('show')
    modal?.setAttribute('aria-hidden', 'true');
    modal?.setAttribute('style', 'display: none');
    // get modal backdrop
    const modalBackdrops = this.document.getElementsByClassName('modal-backdrop');
    // remove opened modal backdrop
    this.document.body.removeChild(modalBackdrops[0]);
    this.document.body.classList.remove('modal-open');
    this.document.body.attributes;
  }

  //og
  setOgTitle(content: any) {
    if (this.meta.getTags('name="og:title"').length > 0) {
      this.meta.removeTag('name="og:title"');
    }
    this.meta.addTag({ name: 'og:title', content: content });

    // if (this.meta.getTags('property="og:title"').length > 0) {
    //   this.meta.removeTag('property="og:title"');
    // }
    // this.meta.addTag({ property: 'og:title', content: content });  
  }

  setOgDescription(content: any) {
    if (this.meta.getTags('name="og:description"').length > 0) {
      this.meta.removeTag('name="og:description"');
    }
    this.meta.addTag({ name: 'og:description', content: content });

    // if (this.meta.getTags('property="og:description"').length > 0) {
    //   this.meta.removeTag('property="og:description"');
    // }
    // this.meta.addTag({ property: 'og:description', content: content });  
  }

  setOgUrl(content: any) {
    if (this.meta.getTags('name="og:url"').length > 0) {
      this.meta.removeTag('name="og:url"');
    }
    this.meta.addTag({ name: 'og:url', content: content });

    // if (this.meta.getTags('property="og:url"').length > 0) {
    //   this.meta.removeTag('property="og:url"');
    // }
    // this.meta.addTag({ property: 'og:url', content: content });
  }

  setOgImage(content: any) {
    if (this.meta.getTags('name="og:image"').length > 0) {
      this.meta.removeTag('name="og:image"');
    }
    this.meta.addTag({ name: 'og:image', content: content });

    // if (this.meta.getTags('property="og:image"').length > 0) {
    //   this.meta.removeTag('property="og:image"');
    // }
    // this.meta.addTag({ property: 'og:image', content: content });
  }




  //twitter
  setTwitterTitle(content: any) {
    if (this.meta.getTags('name="twitter:title"').length > 0) {
      this.meta.removeTag('name="twitter:title"');
    }
    this.meta.addTag({ name: 'twitter:title', content: content });
  }

  setTwitterDescription(content: any) {
    if (this.meta.getTags('name="twitter:description"').length > 0) {
      this.meta.removeTag('name="twitter:description"');
    }
    this.meta.addTag({ name: 'twitter:description', content: content });
  }

  setTwitterUrl(content: any) {
    if (this.meta.getTags('name="twitter:url"').length > 0) {
      this.meta.removeTag('name="twitter:url"');
    }
    this.meta.addTag({ name: 'twitter:url', content: content });

    // if (this.meta.getTags('property="twitter:url"').length > 0) {
    //   this.meta.removeTag('property="twitter:url"');
    // }
    // this.meta.addTag({ property: 'twitter:url', content: content });
  }

  setTwitterImage(content: any) {
    if (this.meta.getTags('name="twitter:image"').length > 0) {
      this.meta.removeTag('name="twitter:image"');
    }
    this.meta.addTag({ name: 'twitter:image', content: content });
  }


  setFooterData() {
    this.getFooterData().subscribe((result: any) => {

      if (result.status == true) {
        this.footerData = result.data;
        this.subFooterData.next(this.footerData);
      }

    });
  }

  getFooterData(): Observable<any> {
    const authCheckURL = `${this.footerURL}`;
    return this.http.get<any>(authCheckURL)
      .pipe(
        tap(data => {

        }),
        catchError(this.handleError<any>('userAuthCheck', { "status": false, "message": "userAuthCheck Error" }))
      );
  }


  // currency convert
  public setCurrency(currency: any) {

    if (currency != false) {
      // this.localstorageService.setItem('currency', JSON.stringify(currency));
      this.cookieService.set('currency', JSON.stringify(currency), { expires: 1, path: '/' });
      this.currency.next(currency);
    }
  }

  public getCurrency(): Observable<any> {
    return this.currency.asObservable();
  }


  getSelectedCurrency() {

    //let currency = this.localstorageService.getItem('currency');
    let currency = this.cookieService.get('currency');

    if (currency.length > 0) {
      this.selectedcurrency = JSON.parse(currency);
    }
    else if (this.footerData.defaultCurrency != undefined) {
      // this.localstorageService.setItem('currency', JSON.stringify(this.footerData.defaultCurrency));
      this.cookieService.set('currency', JSON.stringify(this.footerData.defaultCurrency), { expires: 1, path: '/' });

      // let currency : any = this.localstorageService.getItem('currency');
      let currency = this.cookieService.get('currency');

      if (currency) {
        this.selectedcurrency = JSON.parse(currency);
      }
    }

    return this.selectedcurrency;
  }

  /**
  * @param pageType Company, Product Listing, Product Detail, Blog Listing, Blog Detail, LP Listing, LP Detail, etc...
  * 
  * @param mediaType Company, Radio, Cinema, Transit, Outdoor, Nontraditional, Newspaper, Magazine, Television, Mall, Digital, Digitalpr, Influencer, Corporategifting, Inflight, Airport, Design Solutions, Interactive Meets, Sports Marketing, Other etc...
  */

  gtmPageEvents(pageType: string, mediaType: string) {
    // push GTM data layer for every visited page

    const gtmTag = {
      event: 'page',
      content_group: mediaType,
      content_type: pageType,
      content_id: this.router.url,
    };

    this.gtmService.pushTag(gtmTag);
  }


  /**
  * @param event login, sign_up
  * @param placement Header, Product Listing, Product Detail etc...  * 
  * @param item  Product Name
  * @param time  Time in second
  * @param identity  User Id
  */

  gtmLoginSignupEvents(event: 'login' | 'sign_up', placement: string, item: string, time: number, identity: number) {

    const gtmTag = {
      event: event,
      custom_login_placement: placement,
      custom_login_identity: identity,
      custom_form_fill_duration: time,
      custom_item_name: item
    };

    this.gtmService.pushTag(gtmTag);

  }


  /**
  * @param formType  Contact, Hire a Planner, Sports Marketing, Airport, Design Solutions, Interactive Meets
  * @param identity  Inquiry Id
  */

  gtmGenerateLeadEvents(formType: string, identity: number) {

    const gtmTag = {
      event: 'generate_lead',
      currency: 'INR',
      value: 10000,
      custom_form_type: formType,
      custom_lead_no: identity
    };

    this.gtmService.pushTag(gtmTag);

  }

  /**
  * @param filterData Location: Name, Language: Hindi 
  */

  gtmCustomMediaFilterEvents(filterData: string) {

    const gtmTag = {
      event: 'custom_media_filter',
      custom_filter_data: filterData
    };

    this.gtmService.pushTag(gtmTag);
  }

  /**
  * @param searchTerm Site Search inputbox value 
  * @param resultTitle Selected Product Name 
  * @param resultUrl Selected Product Url 
  * @param suggestions 'yes' | 'no' 
  */

  gtmViewSearchResultsEvents(searchTerm: string, resultTitle: string, resultUrl: string, suggestions: 'yes' | 'no') {

    const gtmTag = {
      event: 'view_search_results',
      search_term: searchTerm,
      custom_search_result_title: resultTitle,
      custom_search_result_url: resultUrl,
      custom_search_suggestions_appear: suggestions,
    };

    this.gtmService.pushTag(gtmTag);
  }

  /**
  * @param searchTerm Site Search inputbox value  
  * @param suggestions 'yes' | 'no' 
  */

  gtmViewSearchResultsPageEvents(searchTerm: string, suggestions: 'yes' | 'no' | any) {

    const gtmTag = {
      event: 'view_search_results',
      search_term: searchTerm,
      custom_search_result_title: '',
      custom_search_result_url: '',
      custom_search_suggestions_appear: suggestions,
    };

    this.gtmService.pushTag(gtmTag);
  }

  /**
  * @param filter Filter Name
  * @param value Filter Value 
  */

  getGtmFilterString(filter: string, value: string) {
    return filter + ':' + value;
  }


  replaceDashWithSpace(string: string) {
    return ((string).replace(/-/g, ' ')).trim();
  }


  getDetectCountry(): Observable<any> {
    const setCurrencyUrl = `${this.setCurrencyUrl}`;
    return this.http.get<any>(setCurrencyUrl)
      .pipe(
        tap(data => {

        }),
        catchError(this.handleError<any>('Get Detect Country', { "status": false, "message": "Get Detect Country Error" }))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //return of(result as T);
      return of(result as T);
    };

  }
}
