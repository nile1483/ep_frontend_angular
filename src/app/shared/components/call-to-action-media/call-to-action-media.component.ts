import { Component, Input, OnInit } from '@angular/core';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';
@Component({
  selector: 'app-call-to-action-media',
  templateUrl: './call-to-action-media.component.html',
  styleUrls: ['./call-to-action-media.component.css']
})
export class CallToActionMediaComponent implements OnInit {

  
  app_svg_icon_list = APP_SVG_ICON_LIST; 
  @Input() mediaCallToActionData:any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
