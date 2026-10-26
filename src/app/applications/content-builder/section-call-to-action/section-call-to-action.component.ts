import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { APP_SVG_ICON_LIST} from '@app-shared-constants';

@Component({
    selector: 'section-call-to-action',
    templateUrl: './section-call-to-action.component.html',
    styleUrls: ['./section-call-to-action.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SectionCallToActionComponent implements OnInit {
  app_svg_icon_list = APP_SVG_ICON_LIST;
  @Input() pageBlock:any;
  constructor() { }

  ngOnInit(): void { 
  }

}
