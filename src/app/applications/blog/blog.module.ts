import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';

import { BlogRoutingModule } from './blog-routing.module';

import { BlogService } from './blog.service';

import { ContentBuilderModule } from '../content-builder/content-builder.module';

import { BlogListPageComponent } from './blog-list-page/blog-list-page.component';
import { BlogDetailPageComponent } from './blog-detail-page/blog-detail-page.component';
import { BlogAuthorPageComponent } from './blog-author-page/blog-author-page.component';

@NgModule({
  declarations: [
    BlogListPageComponent,
    BlogDetailPageComponent,
    BlogAuthorPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BlogRoutingModule,
    ContentBuilderModule,
    SharedModule
  ],

  providers: [BlogService],
})
export class BlogModule { }