import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SectionInquiryFormDialogComponent } from './../section-inquiry-form-dialog/section-inquiry-form-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'section-card-with-media-icon-link',
    templateUrl: './section-card-with-media-icon-link.component.html',
    styleUrl: './section-card-with-media-icon-link.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SectionCardWithMediaIconLinkComponent {

  @Input() pageBlock: any;

  href!: string;
  width: number = 80;
  height: number = 80;
  
  constructor(
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.href = this.router.url;

    if ('content' in this.pageBlock) {
      let tempContent: any = {};
      let iconBlocks: any[] = [];

      this.pageBlock.content.forEach((element: any) => {

        if (element.type == "card_media_icon_label_link") {
          iconBlocks.push(element.value)
        }
        else {
          tempContent[element.type] = element[element.type];
        }

      });
      tempContent['card_media_with_icon_block_data'] = iconBlocks;
      this.pageBlock = tempContent;

    }
  }

  openFormDialog(): void {

    const dialogRef = this.dialog.open(SectionInquiryFormDialogComponent, {
      width: '600px',
      data: { url : this.href}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
