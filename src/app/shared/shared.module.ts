import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { SwiperModule } from "swiper/angular";

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

import { HeaderMenuComponent } from '@app-shared-components';
import { FooterComponent, StaticPageFooterComponent, StaticPageHeaderMenuComponent } from '@app-shared-components';
import { CallToActionComponent } from '@app-shared-components';
import { CallToActionMediaComponent } from '@app-shared-components';
import { UserLoginDialogComponent } from '@app-shared-components';
import { SearchResultComponent } from '@app-shared-components';
import { LoaderDialogComponent } from '@app-shared-components';
import { UserLoginComponent } from '@app-shared-components';
import { NoResultsComponent } from '@app-shared-components';
import { LoaderComponent } from '@app-shared-components';

import { CookieService, LocalstorageService } from '@app-shared-services';
import { LoaderService } from '@app-shared-services';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';

import { DialogPriceOnRequestComponent } from '@app-media-shared-components';
import { AddToPlanDialogComponent } from '@app-media-shared-components';
import { ShoppingCartComponent } from '@app-media-shared-components';
import { ClickOutsideDirective } from './directives';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ConvertToExchange } from './pipes/to-exchange.pipe';

import { DropDownAttributeComponent, DropDownOptionComponent } from '../applications/media/shared/components/dynamic-field-builder';
import { RadioAttributeComponent, RadioOptionComponent } from '../applications/media/shared/components/dynamic-field-builder';
import { FieldBuilderComponent, NumberComponent, TextBoxComponent } from '../applications/media/shared/components/dynamic-field-builder';
import { SecHeadingPagenotfoundComponent } from '../applications/media/shared/components/sec-heading-pagenotfound/sec-heading-pagenotfound.component';
import { ScheduleACallComponent } from './components/schedule-a-call/schedule-a-call.component';

const sharedModule: any[] = [
  CommonModule,
  RouterModule,
  OverlayModule,
  SwiperModule,
  MatDialogModule,
  MatSnackBarModule,
  FormsModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatTooltipModule,
  MatChipsModule,
  MatSliderModule,
  MatAutocompleteModule,
  MatIconModule
];
const sharedPipes: any[] = [
  SafeHtmlPipe,
  ConvertToExchange
];
const sharedServices: any[] = [
  LocalstorageService,
  LoaderService,
  CookieService

];
const sharedComponents: any[] = [
  HeaderMenuComponent,
  MainLayoutComponent,
  CallToActionComponent,
  CallToActionMediaComponent,
  FooterComponent,
  UserLoginComponent,
  UserLoginDialogComponent,
  AddToPlanDialogComponent,
  DialogPriceOnRequestComponent,
  ShoppingCartComponent,
  LoaderComponent,
  LoaderDialogComponent,
  SearchResultComponent,
  NoResultsComponent,
  FieldBuilderComponent,
  TextBoxComponent,
  NumberComponent,
  DropDownAttributeComponent,
  DropDownOptionComponent,
  RadioAttributeComponent,
  RadioOptionComponent,
  StaticPageFooterComponent,
  StaticPageHeaderMenuComponent,
  SecHeadingPagenotfoundComponent
];
const sharedDirectives: any[] = [
  ClickOutsideDirective
];

const entryComponents: any[] = [];

@NgModule({
  imports: [...sharedModule],
  declarations: [...sharedDirectives, ...sharedComponents, ...sharedPipes, ...entryComponents, StaticPageHeaderMenuComponent, ScheduleACallComponent],
  providers: [...sharedServices],
  exports: [...sharedModule, ...sharedDirectives, ...sharedComponents, ...sharedPipes]
})
export class SharedModule { }
