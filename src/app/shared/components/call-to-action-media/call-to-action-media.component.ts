import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';
@Component({
    selector: 'app-call-to-action-media',
    templateUrl: './call-to-action-media.component.html',
    styleUrls: ['./call-to-action-media.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CallToActionMediaComponent implements OnInit {

  
  app_svg_icon_list = APP_SVG_ICON_LIST; 
  @Input() mediaCallToActionData:any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
