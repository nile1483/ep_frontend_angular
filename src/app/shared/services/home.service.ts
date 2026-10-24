import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppURL } from 'src/app/app-url';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  moduleName  = 'Home';
  
  trendingMediaUrl = AppURL.trendingmedialist;
  searchsite = AppURL.searchsite;
  
  constructor(private http: HttpClient) { }


  getTrendingMediaList(): Observable<any> {
    
    const url = `${this.trendingMediaUrl}`;

    return this.http.get<any>(url)
      .pipe(
        tap(data => {

        }),
        catchError(this.handleError<any>('Cinema Filters', { "status": false, "message": "Get Cinema Filters Error" }))
      );
  }
  
  searchSite(data: any): Observable<any> {
    const url = `${this.searchsite}`;
    const options = { params: data['param'] };
    return this.http.get<any>(url, options)
      .pipe( tap(data => {}),
        catchError(this.handleError<any>( 'Site search Get', { "status": false, "message": "Site Search Data Get Error" }))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //return of(result as T);
      return of(result as T);
    };

  }
  

}
