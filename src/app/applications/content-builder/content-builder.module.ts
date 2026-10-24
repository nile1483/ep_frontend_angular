import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

import { SectionBannerCallToActionLinkComponent } from '@app-content-builder-components';
import { SectionAdvertisingSampleComponent } from '@app-content-builder-components';
import { SectionCardHorizontalComponent } from '@app-content-builder-components';
import { SectionCardWithImageComponent } from '@app-content-builder-components';
import { SectionCardWithIconComponent } from '@app-content-builder-components';
import { SectionCallToActionComponent } from '@app-content-builder-components';
import { SectionDescriptionComponent } from '@app-content-builder-components';
import { SectionOurServicesComponent } from '@app-content-builder-components';
import { SectionHighlightComponent } from '@app-content-builder-components';
import { SectionClienteleComponent } from '@app-content-builder-components';
import { SectionDataListComponent } from '@app-content-builder-components';
import { SectionFeaturesComponent } from '@app-content-builder-components';
import { ContentBuilderComponent } from '@app-content-builder-components';
import { SectionStepComponent } from '@app-content-builder-components';
import { SectionFaqComponent } from '@app-content-builder-components';
import { SectionRelatedProductsComponent } from './section-related-products/section-related-products.component';
import { SectionTableOfContentComponent } from './section-table-of-content/section-table-of-content.component';
import { SectionHeaderNavigationComponent } from './section-header-navigation/section-header-navigation.component';
import { SectionBannerTitleDescriptionComponent } from './section-banner-title-description/section-banner-title-description.component';
import { SectionCardWithImageLinkComponent } from './section-card-with-image-link/section-card-with-image-link.component';
import { SectionCardWithMediaIconLinkComponent } from './section-card-with-media-icon-link/section-card-with-media-icon-link.component';
import { SectionBottomCallToActionComponent } from './section-bottom-call-to-action/section-bottom-call-to-action.component';
import { SectionInquiryFormComponent } from './section-inquiry-form/section-inquiry-form.component';
import { SectionInquiryFormDialogComponent } from './section-inquiry-form-dialog/section-inquiry-form-dialog.component';
import { SectionFooterComponent } from './section-footer/section-footer.component';



const sharedComponents: any[] = [

  ContentBuilderComponent,
  SectionCallToActionComponent,
  SectionClienteleComponent,
  SectionDataListComponent,
  SectionDescriptionComponent,
  SectionFaqComponent,
  SectionOurServicesComponent,
  SectionStepComponent,
  SectionBannerCallToActionLinkComponent,
  SectionHighlightComponent,  
  SectionAdvertisingSampleComponent,
  SectionFeaturesComponent,
  SectionCardHorizontalComponent,
  SectionCardWithImageComponent,
  SectionCardWithIconComponent,
  SectionRelatedProductsComponent,
  SectionTableOfContentComponent,
  SectionHeaderNavigationComponent,
  SectionBannerTitleDescriptionComponent,
  SectionCardWithImageLinkComponent,
  SectionCardWithMediaIconLinkComponent,
  SectionBottomCallToActionComponent,
  SectionInquiryFormComponent,
  SectionInquiryFormDialogComponent,
  SectionFooterComponent
];

@NgModule({

  declarations: [...sharedComponents],
  exports: [...sharedComponents],

  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class ContentBuilderModule { }
