import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppURL } from 'src/app/app-url';

@Injectable({
  providedIn: 'root'
})

export class PageService {

  moduleName = 'Inquiry Page';

  inquiryUrl = AppURL.inquiry;
  contactUrl = AppURL.contact;
  hireaplannerUrl = AppURL.hireaplanner;
  newsletterUrl = AppURL.newsletter;
  countryPageUrl = AppURL.countryPageUrl;

  iplUrl = AppURL.iplUrl;
  sportUrl = AppURL.sportUrl;
  asiacupUrl = AppURL.asiacupUrl;
  worldcupUrl = AppURL.worldcupUrl;
  budgetestimatorUrl = AppURL.budgetestimatorUrl;
  industryInsightsUrl = AppURL.industryInsightsUrl;
  salesDeckUrl = AppURL.salesDeckUrl;


  constructor(
    private http: HttpClient
  ) { }


  inquiryContactCreate(data: any): Observable<any> {
    const url = `${this.contactUrl}`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Contact inquiry added', { "status": false, "message": "Contact inquiry added error" }))
      );
  }

  inquiryHireaplannerCreate(data: any): Observable<any> {
    const url = `${this.hireaplannerUrl}`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Hire a planner inquiry added', { "status": false, "message": "Hire a planner inquiry added error" }))
      );
  }
  
  subscribeNewsletter(data: any): Observable<any> {
    const url = `${this.newsletterUrl}`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Newsletter subscribed', { "status": false, "message": "Newsletter subscribe error" }))
      );
  }

  mediaPageFileUpload(data: any): Observable<any> {
    const url = `${this.inquiryUrl}/${data['inquiryType']}/fileupload`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
         }),
        catchError(this.handleError<any>('Media page file upload', { "status": false, "message": "Media page file upload error" }))
      );
  }
  
  proBonoPageFileUpload(data: any): Observable<any> {
    const url = `${this.inquiryUrl}/${data['inquiryType']}/fileupload`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
         }),
        catchError(this.handleError<any>('Pro Bono page file upload', { "status": false, "message": "Pro Bono page file upload error" }))
      );
  }

  inquiryOtherServicesCreate(data: any): Observable<any> {
    const url = `${this.inquiryUrl}/${data['inquiryType']}`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Inquiry other service added', { "status": false, "message": "Inquiry other service error" }))
      );
  }



  // IPL page data
  getIplPageData(): Observable<any> {
    const url = `${this.iplUrl}/ipldetail`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>(this.moduleName + ' IPL Detail', { "status": false, "message": "Get " + this.moduleName + " IPL Detail Error" }))
      );
  }

  // Sports page data
  getSportsPageData(): Observable<any> {
    const url = `${this.sportUrl}/sportsdetail`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>(this.moduleName + ' Sports Detail', { "status": false, "message": "Get " + this.moduleName + " Sports Detail Error" }))
      );
  }

  // AsiaCup page data
  getAsiaCupPageData(): Observable<any> {
    const url = `${this.asiacupUrl}/asiacupdetail`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>(this.moduleName + ' AsiaCup Detail', { "status": false, "message": "Get " + this.moduleName + " AsiaCup Detail Error" }))
      );
  }

  // WorldCup page data
  getWorldCupPageData(): Observable<any> {
    const url = `${this.worldcupUrl}/worldcupdetail`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>(this.moduleName + ' WorldCup Detail', { "status": false, "message": "Get " + this.moduleName + " WorldCup Detail Error" }))
      );
  }

  quickInquiryGiftingCreate(data: any): Observable<any> {
    const url = `${this.inquiryUrl}/corporategifting/quickenquiry`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Quick Inquiry Gifting added', { "status": false, "message": "Quick Inquiry Gifting error" }))
      );
  }

  catalogDownloadGiftingCreate(data: any): Observable<any> {
    const url = `${this.inquiryUrl}/corporategifting/catalogdownload`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Catalog Download Gifting added', { "status": false, "message": "Catalog Download Gifting error" }))
      );
  }

  countryPageDetail(params: any): Observable<any> {
    const options = encodeURIComponent(JSON.stringify(params));
    const url = `${this.countryPageUrl}/content?params=${options}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Country Page Detail', { "status": false, "message": "Country Page Detail Error" }))
      );
  }


  inFilmAndCobrandingCreate(data: any): Observable<any> {
    const url = `${this.inquiryUrl}/infilmandcobranding`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('In Film And Cobranding added', { "status": false, "message": "In Film And Cobranding error" }))
      );
  }


  getIndustryInsightsAdvertisingPageData(pageType: string): Observable<any> {
    const url = `${this.industryInsightsUrl}/${pageType}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Industry Insights Advertising Detail', { "status": false, "message": "Get Industry Insights Advertising Detail Error" }))
      );
  }


   // Budget Estimator page data
  getBudgetEstimator(typeUrl: any): Observable<any> {
    const url = `${this.budgetestimatorUrl}/${typeUrl}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>(this.moduleName + 'Budget Estimator', { "status": false, "message": "Get " + this.moduleName + "Budget Estimator Error" }))
      );
  }

  // Budget Estimator search location
  searchLocation(data: any): Observable<any> {
    const url = `${this.budgetestimatorUrl}/searchlocation`;
    const options = { params: data['param'] };
    return this.http.get<any>(url, options)
      .pipe( tap(data => {}),
        catchError(this.handleError<any>(this.moduleName + ' Search Location Data Get', { "status": false, "message": this.moduleName + " Search Location Data Get Error" }))
      );
  } 


  salesDeckCreate(data: any): Observable<any> {
    const url = `${this.salesDeckUrl}`;
    return this.http.post<any>(url, data['formData'])
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Sales Deck added', { "status": false, "message": "Sales Deck added error" }))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //return of(result as T);
      return of(result as T);
    };

  }






}
