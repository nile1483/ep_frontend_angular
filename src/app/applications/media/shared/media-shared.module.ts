import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilterPipe } from './pipes/filter.pipe';
import { MaskPipe } from './pipes/mask.pipe';


import { ContentBuilderModule } from '../../content-builder/content-builder.module';
import { SharedModule } from 'src/app/shared/shared.module';

 

const sharedModule: any[] = [
  CommonModule,
  RouterModule,
  ContentBuilderModule,
  SharedModule
];
const sharedPipes: any[] = [
  FilterPipe,
  MaskPipe
];
const sharedServices: any[] = [];
const sharedComponents: any[] = [];
const sharedDirectives: any[] = [];
const entryComponents: any[] = [];

@NgModule({
  imports: [...sharedModule],
  declarations: [...sharedDirectives, ...sharedComponents, ...sharedPipes, ...entryComponents],
  providers: [...sharedServices],
  exports: [...sharedModule, ...sharedDirectives, ...sharedComponents, ...sharedPipes]
})
export class MediaSharedModule { }
