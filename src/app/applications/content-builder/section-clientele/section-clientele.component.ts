import { Component, OnInit } from '@angular/core';
import { APP_SVG_ICON_LIST} from '@app-shared-constants';
@Component({
    selector: 'section-clientele',
    templateUrl: './section-clientele.component.html',
    styleUrls: ['./section-clientele.component.css'],
    standalone: false
})
export class SectionClienteleComponent implements OnInit {
  app_svg_icon_list = APP_SVG_ICON_LIST;
  constructor() { }

  ngOnInit(): void {
  }

}
