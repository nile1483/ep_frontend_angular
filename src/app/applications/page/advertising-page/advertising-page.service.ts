import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AppURL } from 'src/app/app-url';

@Injectable({
  providedIn: 'root'
})
export class AdvertisingPageService {

  advertisingPageUrl = AppURL.advertisingUrl;

  constructor(private http: HttpClient) { }


  advertisingPageList(): Observable<any> {
    const url = `${this.advertisingPageUrl}`; 
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Advertising Page List', { "status": false, "message": "Advertising Page List Error" }))
      );
  } 


  advertisingPageDetail(params:any): Observable<any> {

    const options  = encodeURIComponent(JSON.stringify(params));
    const url = `${this.advertisingPageUrl}/content?params=${options}`; 
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Advertising Page Detail', { "status": false, "message": "Advertising Page Detail Error" }))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
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
