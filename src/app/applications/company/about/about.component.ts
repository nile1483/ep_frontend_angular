import { Component, OnInit } from '@angular/core';
import { META_DATA } from 'src/app/shared/constants/metadata';
import SwiperCore, { SwiperOptions, Pagination } from 'swiper';
import { AppURL } from 'src/app/app-url';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { APP_SVG_ICON_LIST} from '@app-shared-constants';

// SwiperCore.use([Pagination]);
@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: false
})
export class AboutComponent implements OnInit {
  app_svg_icon_list = APP_SVG_ICON_LIST; 
  webURL: string = AppURL.webURL;
  page:string = 'about'
  metaData: any = META_DATA['about'];
  config: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: true,
    navigation: { nextEl: '.media-coverage-next', prevEl: '.media-coverage-previous' },
    pagination: { el: '.media-coverage-pagination', clickable: true, dynamicBullets: true, dynamicMainBullets: 1 },
    breakpoints:
    {
      300: { slidesPerView: 1 }, // when window width is >= 480px
      576: { slidesPerView: 1 }, // when window width is >= 640px
      768: { slidesPerView: 2, spaceBetween: 30 }, // when window width is >= 640px
      992: { slidesPerView: 3, spaceBetween: 40 }
    },

  };

  constructor(
    private commonService: CommonService
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

     this.commonService.gtmPageEvents('Company','Company'); 
  }

}
