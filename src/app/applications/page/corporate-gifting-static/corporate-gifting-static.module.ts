import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';


import { SharedModule } from 'src/app/shared/shared.module';
import { CorporateGiftingStaticRoutingModule } from './corporate-gifting-static-routing.module';
import { CorporateGiftingStaticComponent } from './corporate-gifting-static/corporate-gifting-static.component';
import { CorporateGiftingDetailComponent, CatalogDownloadInquiryDialog } from './corporate-gifting-detail/corporate-gifting-detail.component';


@NgModule({
  declarations: [
    CorporateGiftingStaticComponent,
    CorporateGiftingDetailComponent,
    CatalogDownloadInquiryDialog
  ],
  imports: [
    SharedModule,
    CommonModule,
    CorporateGiftingStaticRoutingModule,
    MatDividerModule
  ],
  // entryComponents: [
  //   CatalogDownloadInquiryDialog
  // ],
})
export class CorporateGiftingStaticModule { }
