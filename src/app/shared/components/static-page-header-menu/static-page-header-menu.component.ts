import { Component, OnInit, Input } from '@angular/core';
import { APP_SVG_ICON_LIST, MENU_LIST_WITH_SVG_ICON } from '@app-shared-constants';

// import Swiper core and required components
import SwiperCore , {SwiperOptions, Navigation } from 'swiper'; 

// install Swiper components
SwiperCore.use([
  Navigation,  
]);


@Component({
    selector: 'app-static-page-header-menu',
    templateUrl: './static-page-header-menu.component.html',
    styleUrl: './static-page-header-menu.component.css',
    standalone: false
})
export class StaticPageHeaderMenuComponent {

  @Input() headerData:any = {};
  app_svg_icon_list = APP_SVG_ICON_LIST; 
  
  config: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 5, 
    loop:false,
    navigation:  { nextEl: '.carousel-menu-next', prevEl: '.carousel-menu-previous' },
  };

  
  constructor() { }

  ngOnInit(): void {
  }

}
