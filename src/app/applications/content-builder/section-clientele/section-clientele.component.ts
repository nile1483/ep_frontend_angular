import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { APP_SVG_ICON_LIST} from '@app-shared-constants';
@Component({
    selector: 'section-clientele',
    templateUrl: './section-clientele.component.html',
    styleUrls: ['./section-clientele.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SectionClienteleComponent implements OnInit {
  app_svg_icon_list = APP_SVG_ICON_LIST;
  constructor() { }

  ngOnInit(): void {
  }

}
