import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LandingPageService } from '../landingpage.service';
import { Router } from '@angular/router';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { AppURL } from 'src/app/app-url';

@Component({
    selector: 'app-landing-page-list',
    templateUrl: './landing-page-list.component.html',
    styleUrls: ['./landing-page-list.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LandingPageListComponent implements OnInit {

  webURL : string = AppURL.webURL;
  param: any = {};
  landingPageList: any = [];
  lpMedia: string = "";
  isDataLoaded: boolean = false;
  search_string:string ="";
  constructor(
    private landingPageService: LandingPageService,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) {
     
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['media']) { this.param.media = params['media']; }
      if (params['segment']) { this.param.segment = params['segment']; }
      this.search_string = this.param.media + ' ' + this.param.segment;
      this.search_string.trim();
      this.setMetaData();
      this.getAllLandingPage(this.param);
    });
  }

  getAllLandingPage(param: any) {
    this.landingPageService.landingPageList(param).subscribe(result => {
      this.isDataLoaded = true;
      if (result.status == true) {
        this.landingPageList = result?.data ?? [];  
      } else {
        this.commonService.subSearchsite.next(this.search_string);
      }
      
      
    });
  }
  
  setMetaData() {
    
    let title = "Landing Page";
    let mediagt = "mix"; 
    if(this.param?.media)
    {
      title = this.param?.media[0].toUpperCase() + this.param?.media.substr(1).toLowerCase();
      mediagt = title;
      this.lpMedia = title;
    }

    if(this.param?. media && this.param?.segment)
    {
      let media = this.param?.media[0].toUpperCase() + this.param?.media.substr(1).toLowerCase();
      let segment = this.param?.segment[0].toUpperCase() + this.param?.segment.substr(1).toLowerCase();
      title = media + " " + segment;
      mediagt = media;
      this.lpMedia = media;
    }

    title = title + " : Excellent Publicity";
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = title; 
    metaInfo.meta_description = title;  
    metaInfo.canonical_url = `${this.webURL}`+ `${this.router.url}`;       
    this.commonService.setMetaData(metaInfo); 

    let media = mediagt[0].toUpperCase() + mediagt.slice(1).toLowerCase(); 
    this.commonService.gtmPageEvents('LP Listing', media);

  }
}
