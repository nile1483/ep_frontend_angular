import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppURL } from 'src/app/app-url';
import { MediaService } from '@app-media-services';

@Injectable({
  providedIn: 'root'
})

export class AirportService extends MediaService {

  media = 'airport';

  constructor(private _http: HttpClient ) { 
    super(_http);
    AppURL.setUrl(this.media);
    this.mediaName = this.media;
    this.mediaUrl = AppURL.mediaUrl;
    this.mediaConfigUrl = AppURL.mediaConfigUrl;
    
  }  

}
