import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogListPageComponent } from './blog-list-page/blog-list-page.component';
import { BlogDetailPageComponent } from './blog-detail-page/blog-detail-page.component';
import { BlogAuthorPageComponent } from './blog-author-page/blog-author-page.component';

const routes: Routes = [
  { path: '', component: BlogListPageComponent},
  { path: 'author/:slug', component: BlogAuthorPageComponent},
  { path: 'category/:categoryName', component: BlogListPageComponent},
  { path: ':alias', component: BlogDetailPageComponent}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }