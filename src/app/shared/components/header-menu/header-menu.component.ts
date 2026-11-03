import { Component, OnInit } from '@angular/core';
import { APP_SVG_ICON_LIST, MENU_LIST_WITH_SVG_ICON } from '@app-shared-constants';

// import Swiper core and required components
import SwiperCore , {SwiperOptions, Navigation } from 'swiper'; 

// install Swiper components
SwiperCore.use([
  Navigation,  
]);

@Component({
    selector: 'app-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.css'],
    standalone: false
})
export class HeaderMenuComponent implements OnInit {

  app_svg_icon_list = APP_SVG_ICON_LIST; 
  listMenu:any[] = MENU_LIST_WITH_SVG_ICON;
  
  config: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 5, 
    loop:true,
    navigation:  { nextEl: '.carousel-menu-next', prevEl: '.carousel-menu-previous' },
  };

  
  constructor() { }

  ngOnInit(): void {
  }

}
