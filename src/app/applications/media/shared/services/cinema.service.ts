import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppURL } from 'src/app/app-url';
import { MediaService } from './media.service';

@Injectable({
  providedIn: 'root'
})

export class CinemaService extends MediaService {
  
  media = 'cinema';

  constructor(private _http: HttpClient ) { 
    super(_http);
    AppURL.setUrl(this.media);
    this.mediaUrl = AppURL.mediaUrl;
    this.mediaConfigUrl = AppURL.mediaConfigUrl;
  }
   

}
