import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class MediaService {

  mediaName : string = '';
  mediaUrl : string = '';
  mediaConfigUrl : string = '';

  constructor(  
                private http: HttpClient,
 
              ) {}

  // Media Config : filter, inquery user etc 
  getMediaConfig(): Observable<any> {
    const url = `${this.mediaConfigUrl}`;
    return this.http.get<any>(url)
      .pipe( tap(data => {}),
        catchError(this.handleError<any>(this.mediaName + ' Filters', { "status": false, "message": "Get "+ this.mediaName + "Config Error" }))
      );
  }

  // media list
  getMediaList(params : any): Observable<any> {
    const options  = encodeURIComponent(JSON.stringify(params));
    const url = `${this.mediaUrl}?params=${options}`;
    return this.http.get<any>(url)
      .pipe(tap(data => { }),
        catchError(this.handleError<any>( this.mediaName + ' List', { "status": false, "message": "Get "+ this.mediaName +" List Error" }))
      );
  }

  // media detail
  getMediaDetail(alias : string): Observable<any> {
    const url = `${this.mediaUrl}/${alias}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>(this.mediaName +' Detail', { "status": false, "message": "Get "+ this.mediaName +" Detail Error" }))
      );
  }

  // search location
  searchLocation(data: any): Observable<any> {
    const url = `${this.mediaUrl}/searchlocation`;
    const options = { params: data['param'] };
    return this.http.get<any>(url, options)
      .pipe( tap(data => {}),
        catchError(this.handleError<any>(this.mediaName + ' Search Location Data Get', { "status": false, "message": this.mediaName + " Search Location Data Get Error" }))
      );
  } 

  // handleError 
   handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //return of(result as T);
      return of(result as T);
    };

  }

}
