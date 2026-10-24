import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AppURL } from 'src/app/app-url';

@Injectable({
  providedIn: 'root'
})
export class MediaplanningService {

  mediaplanUrl         = AppURL.mediaplanUrl;
  mediaplanConfigUrl   = AppURL.mediaplanConfigUrl;

  constructor(private http: HttpClient) { } 

  getMediaplanConfigs(): Observable<any> {
    
    const url = `${this.mediaplanConfigUrl}`;

    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>('Blog Category List', { "status": false, "message": "Blog Category List Error" }))
      );
  }

  getMediaplanData(data:any): Observable<any> {
    
    // this.loader.open();
    const url = `${this.mediaplanUrl}`;
    return this.http.post<any>(url, data)
      .pipe(
        tap(data => {
          // this.loader.close(); 
        }),
        catchError(this.handleError<any>('User Verification', { "status": false, "message": "User Verification Error" }))
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
