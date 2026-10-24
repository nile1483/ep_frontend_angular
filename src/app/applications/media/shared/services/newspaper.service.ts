import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppURL } from 'src/app/app-url';
import { MediaService } from '@app-media-services';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class  NewspaperService extends MediaService {

  media = 'newspaper';

  constructor(private _http: HttpClient ) { 
    super(_http);
    AppURL.setUrl(this.media);
    this.mediaName = this.media;
    this.mediaUrl = AppURL.mediaUrl;
    this.mediaConfigUrl = AppURL.mediaConfigUrl;
    
  }  


  getOfferListForUser(alias: any): Observable<any> {
    const url = `${this.mediaUrl}/${alias}/offerlistforuser`;
    return this._http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>(this.mediaName + ' Offer List For User', { "status": false, "message": this.mediaName + ' Offer List For User Error' }))
      );
  }


  getOfferListForGuest(alias: any): Observable<any> {
    const url = `${this.mediaUrl}/${alias}/offerlistforguest`;
    return this._http.get<any>(url)
      .pipe(
        tap(data => {
        }),
        catchError(this.handleError<any>(this.mediaName + ' Offer List For Guest', { "status": false, "message": this.mediaName + ' Offer List For Guest Error' }))
      );
  }
  

}
