import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SectionInquiryFormDialogComponent } from './../section-inquiry-form-dialog/section-inquiry-form-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'section-card-with-image-link',
    templateUrl: './section-card-with-image-link.component.html',
    styleUrl: './section-card-with-image-link.component.css',
    standalone: false
})
export class SectionCardWithImageLinkComponent {

  @Input() pageBlock: any;

  href!: string;

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

        if (element.type == "card_image_label_link") {
          iconBlocks.push(element.value)
        }
        else {
          tempContent[element.type] = element[element.type];
        }
      });
      tempContent['card_with_image_block_data'] = iconBlocks;
      this.pageBlock = tempContent;

    }
  }

  openFormDialog(): void {

    const dialogRef = this.dialog.open(SectionInquiryFormDialogComponent, {
      width: '600px',
      data: { url: this.href }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
