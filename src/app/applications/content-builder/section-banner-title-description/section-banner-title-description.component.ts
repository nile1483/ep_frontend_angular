import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'section-banner-title-description',
    templateUrl: './section-banner-title-description.component.html',
    styleUrl: './section-banner-title-description.component.css',
    standalone: false
})
export class SectionBannerTitleDescriptionComponent {
  @Input() pageBlock: any;

  constructor() { }

  ngOnInit(): void {
  }
}
