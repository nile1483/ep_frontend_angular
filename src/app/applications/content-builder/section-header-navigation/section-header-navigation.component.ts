import { Component, OnInit, Input } from '@angular/core';
import { APP_SVG_ICON_LIST, MENU_LIST_WITH_SVG_ICON } from '@app-shared-constants';

// import Swiper core and required components
import SwiperCore , {SwiperOptions, Navigation } from 'swiper'; 

// install Swiper components
SwiperCore.use([
  Navigation,  
]);

@Component({
  selector: 'section-header-navigation',
  templateUrl: './section-header-navigation.component.html',
  styleUrl: './section-header-navigation.component.css'
})
export class SectionHeaderNavigationComponent {

  @Input() pageBlock: any;

  app_svg_icon_list = APP_SVG_ICON_LIST; 
  
  config: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 5, 
    loop:true,
    navigation:  { nextEl: '.carousel-menu-next', prevEl: '.carousel-menu-previous' },
  };

  
  constructor() { }

  ngOnInit(): void {
    
    if ('content' in this.pageBlock) {
      let tempContent: any = {};
      let iconBlocks: any[] = [];

      this.pageBlock.content.forEach((element: any) => {

        if (element.type == "header_icon_label_link") {
          iconBlocks.push(element.value)
        }
      });
      tempContent['header_navigation_block_data'] = iconBlocks;
      this.pageBlock = tempContent;

    }

  }

}
