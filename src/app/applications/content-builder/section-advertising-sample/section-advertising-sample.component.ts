import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppSettingspContent } from 'src/app/app-url';

@Component({
    selector: 'section-advertising-sample',
    templateUrl: './section-advertising-sample.component.html',
    styleUrls: ['./section-advertising-sample.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SectionAdvertisingSampleComponent implements OnInit {

  @Input() pageBlock:any;
  
  webUrlAssets : string = AppSettingspContent.webURL;
  
  constructor() { }

  ngOnInit(): void {
     
  }

}
