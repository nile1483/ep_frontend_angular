import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppURL } from 'src/app/app-url';

@Injectable({
  providedIn: 'root'
})

export class ClienteleService {

  moduleName = 'Clientele';
  clientelelistUrl = AppURL.clientelelist;
  clientelecategorylistUrl = AppURL.clientelecategorylist;
  constructor(private http: HttpClient) { }


  getClienteleCategoryList(): Observable<any> {

    const url = `${this.clientelecategorylistUrl}`;

    return this.http.get<any>(url)
      .pipe(
        tap(data => {

        }),
        catchError(this.handleError<any>('Clientele Category List', { "status": false, "message": "Get Clientele Category List Error" }))
      );
  }

  getClienteleList(): Observable<any> {

    const url = `${this.clientelelistUrl}`;

    return this.http.get<any>(url)
      .pipe(
        tap(data => {

        }),
        catchError(this.handleError<any>('Clientele List', { "status": false, "message": "Get Clientele List Error" }))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };

  }

}
