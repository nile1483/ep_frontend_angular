import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import SwiperCore, { SwiperOptions, Pagination, Autoplay } from 'swiper';
// install Swiper components
SwiperCore.use([Pagination, Autoplay]);

@Component({
    selector: 'app-about-new',
    templateUrl: './about-new.component.html',
    styleUrls: ['./about-new.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AboutNewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  config: SwiperOptions = {
    slidesPerView: 'auto',
    autoplay: false,
    speed: 2000,
    loop: true,
    spaceBetween: 10,
    navigation: { nextEl: '.tranding-next', prevEl: '.tranding-previous' },
    pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true, dynamicMainBullets: 1 },
    breakpoints: {
      // 300: { slidesPerView: 1, spaceBetween: 20 }, // when window width is >= 480px
      // 576: { slidesPerView: 2, spaceBetween: 30 }, // when window width is >= 640px
      // 768: { slidesPerView: 3, spaceBetween: 40 }, // when window width is >= 640px
      // 992: { slidesPerView: 3, spaceBetween: 40 }, // when window width is >= 640px
      1200: { slidesPerView: 1, spaceBetween: 10 }
    },
  };



}
