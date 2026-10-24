import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AppURL } from 'src/app/app-url';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  landingPageURL = AppURL.landingPageUrl;
  servicesPageUrl = AppURL.servicesPageUrl;


  constructor(private http: HttpClient) { }

  landingPageList(param: any): Observable<any> {
    const options = encodeURIComponent(JSON.stringify(param));
    const url = `${this.landingPageURL}?params=${options}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Landing Page Data', { "status": false, "message": "Landing Page List Error" }))
      );
  }


  landingPageDetail(param: any): Observable<any> {
    const options = encodeURIComponent(JSON.stringify(param));
    const url = `${this.landingPageURL}/content?params=${options}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Landing Page Content Data', { "status": false, "message": "Landing Page Content Detail Error" }))
      );
  }

  servicesPageDetail(param: any): Observable<any> {
    const options = encodeURIComponent(JSON.stringify(param));
    const url = `${this.servicesPageUrl}/content?params=${options}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Landing Page Content Data', { "status": false, "message": "Landing Page Content Detail Error" }))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //return of(result as T);
      if (error.status == 401) {
        let responce: any = {};
        responce.status = false;
        responce.statusCode = 401;
        responce.message = error.error.message;
        return of(responce as T);
      }

      return of(result as T);
    };

  }

}
