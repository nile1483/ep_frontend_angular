import { Component, Input, OnInit } from '@angular/core';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
    selector: 'app-static-page-footer',
    templateUrl: './static-page-footer.component.html',
    styleUrl: './static-page-footer.component.css',
    standalone: false
})
export class StaticPageFooterComponent {

  app_svg_icon_list = APP_SVG_ICON_LIST;
  @Input() footerData:any = {};

  constructor() { }

  ngOnInit(): void {
  }
 
}
