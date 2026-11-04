import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SERVICE_LIST } from 'src/app/shared/constants/common';
import { SERVICE_LIST_WITH_SVG_ICON } from '@app-shared-constants';
@Component({
    selector: 'section-our-services',
    templateUrl: './section-our-services.component.html',
    styleUrls: ['./section-our-services.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SectionOurServicesComponent implements OnInit {
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON; 
  // serviceList : any = SERVICE_LIST; 
  constructor() { }

  ngOnInit(): void {
  }

}
