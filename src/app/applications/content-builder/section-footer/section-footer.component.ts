import { Component, Input, OnInit } from '@angular/core';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
  selector: 'section-footer',
  templateUrl: './section-footer.component.html',
  styleUrl: './section-footer.component.css'
})
export class SectionFooterComponent {

  @Input() pageBlock: any = {};

  app_svg_icon_list = APP_SVG_ICON_LIST;

  constructor() { }

  ngOnInit(): void {

    if ('content' in this.pageBlock) {
      let tempContent: any = {};
      let iconBlocks: any[] = [];

      this.pageBlock.content.forEach((element: any) => {

        if (element.type == "footer_label_link") {
          iconBlocks.push(element.value)
        }
        else if (element.type == "footer_contact_info") {
          tempContent[element.type] = element.value;
        }
        else {
          tempContent[element.type] = element[element.type];
        }
      });
      tempContent['footer_block_data'] = iconBlocks;
      this.pageBlock = tempContent;
    }

  }


  removeSpaces(value: any) {
    return value.replace(/\s/g, '');
  }

}
