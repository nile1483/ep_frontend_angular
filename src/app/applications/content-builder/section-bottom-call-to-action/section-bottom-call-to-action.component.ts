import { Component, Input, OnInit } from '@angular/core';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';
import { Router } from '@angular/router';

@Component({
    selector: 'section-bottom-call-to-action',
    templateUrl: './section-bottom-call-to-action.component.html',
    styleUrl: './section-bottom-call-to-action.component.css',
    standalone: false
})
export class SectionBottomCallToActionComponent {

  app_svg_icon_list = APP_SVG_ICON_LIST;
  @Input() pageBlock: any;

  constructor( private router: Router) { }

  ngOnInit(): void {
  }
 
  goToContact() {
    this.router.navigate(['/contact'], { queryParams: {q:'quickInquiry'}});
  }

}
