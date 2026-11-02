import { Component, OnInit } from '@angular/core';
import { SERVICE_LIST } from 'src/app/shared/constants/common';
import { META_DATA } from 'src/app/shared/constants/metadata'; 
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { AppURL } from 'src/app/app-url';
import { SERVICE_LIST_WITH_SVG_ICON } from '@app-shared-constants';
import { Router } from '@angular/router';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  serviceList: any = SERVICE_LIST_WITH_SVG_ICON; 
  webURL : string = AppURL.webURL;
  page   : string = 'services';
  metaData : any = META_DATA['services']; 
  //  serviceList : any = SERVICE_LIST; 
  app_svg_icon_list = APP_SVG_ICON_LIST;
  
  constructor(
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
       this.setMetaData();
  }

  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? ''; 
    metaInfo.meta_description = this.metaData?.meta_description ?? ''; 
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? ''; 
    metaInfo.canonical_url = `${this.webURL}`+ `/${this.page}`; 
    //og data          
    metaInfo.og_url = `${this.webURL}`+ `/${this.page}`;       
    metaInfo.og_image = `${this.webURL}`+ '/assets/logo/excellent-logo-footer.webp';
    
    this.commonService.setMetaData(metaInfo); 

     //************************// 
    //   Google Tag Manager   //
    //************************//

    this.commonService.gtmPageEvents('Company', 'Company'); 
 }


 goToContact() {
  this.router.navigate(['/contact'], { queryParams: {q:'quickInquiry'}});
}

}
