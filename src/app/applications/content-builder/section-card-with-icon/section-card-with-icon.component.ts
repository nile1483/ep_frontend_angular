import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'section-card-with-icon',
    templateUrl: './section-card-with-icon.component.html',
    styleUrls: ['./section-card-with-icon.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SectionCardWithIconComponent implements OnInit {

  @Input() pageBlock: any;

  constructor() { }

  ngOnInit(): void {

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
