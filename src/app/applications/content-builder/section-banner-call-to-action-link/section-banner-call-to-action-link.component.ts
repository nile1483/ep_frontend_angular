import { Component, Input, OnInit } from '@angular/core';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';
@Component({
  selector: 'section-banner-call-to-action-link',
  templateUrl: './section-banner-call-to-action-link.component.html',
  styleUrls: ['./section-banner-call-to-action-link.component.css']
})
export class SectionBannerCallToActionLinkComponent implements OnInit {
  app_svg_icon_list = APP_SVG_ICON_LIST;
  @Input() pageBlock: any;
  constructor() { }

  ngOnInit(): void {
    if ('content' in this.pageBlock) {
      let tempContent: any[] = [];
      this.pageBlock.content.forEach((element: any) => {

        if (element.type == "image") {
          let findIndex = tempContent.findIndex(i => i.type == 'header_subheader');

          if (findIndex < 1) {
            tempContent[findIndex].image = element.image;
          }

        }
        else {
          tempContent.push(element);
        }
      });

      this.pageBlock.content = tempContent;
    }
  }

}
