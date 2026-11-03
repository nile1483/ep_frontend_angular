import { Component, Input, OnInit } from '@angular/core';
import { SERVICE_LIST_WITH_SVG_ICON } from '@app-shared-constants';
@Component({
    selector: 'section-highlight',
    templateUrl: './section-highlight.component.html',
    styleUrls: ['./section-highlight.component.css'],
    standalone: false
})
export class SectionHighlightComponent implements OnInit {
  serviceList: any = SERVICE_LIST_WITH_SVG_ICON;
  @Input() pageBlock: any;

  constructor() { }

  ngOnInit() {
    
    if ('content' in this.pageBlock) {
      let tempContent: any = {};
      let iconBlocks: any[] = [];

      this.pageBlock.content.forEach((element: any) => {

        if (element.type == "icon_block") {
          iconBlocks.push(element.value)
        }

        tempContent[element.type] = element[element.type];

      });

      tempContent['icon_block'] = iconBlocks;
      this.pageBlock = tempContent;

    }
  }
}
