import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogParams } from 'src/app/shared/model';
import { BlogService } from '../blog.service';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { AppURL } from 'src/app/app-url';
import { META_DATA } from 'src/app/shared/constants/metadata';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
    selector: 'app-blog-author-page',
    templateUrl: './blog-author-page.component.html',
    styleUrls: ['./blog-author-page.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class BlogAuthorPageComponent implements OnInit {

  linkName: any = '';
  app_svg_icon_list = APP_SVG_ICON_LIST;
  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['blog'];
  params: any = new BlogParams();
  authorData: any = {};
  blogListData: any[] = [];
  isShowViewMore: boolean = true;

  callToActionData: CallToAction = {
    title: "Explore 5,00,00+ Media items rate in one click",
    inquiryUser: {}
  }

  constructor(
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
  ) { }


  ngOnInit(): void {

    this.params.type = this.checkLinkUrl();

    this.route.params.subscribe((x) => {

      this.params.author = (x["slug"] !== undefined) ? x["slug"] : '';
      this.params.path = this.router.url;
      // this.params.type = (this.linkName != 'news') ? 'blog' : 'news';
      this.params.offset = 0;
      this.blogListData = [];
      this.getBlogList();
    });

  }

  checkLinkUrl() {
    this.linkName = this.router.url.split('/')[1];

    let type = 'blog';
    if (this.linkName == 'blog') {
      type = 'blog';
    }
    if (this.linkName == 'news') {
      type = 'news';
    }
    if (this.linkName == 'casestudy') {
      type = 'casestudy';
    }

    return type;
  }

  // get Blog List
  getBlogList() {

    this.blogService.getBlogListByAuthor(this.linkName, this.params).subscribe(result => {

      if (result.status == true) {
        this.authorData = result.data;
        this.blogListData = (this.blogListData.length == 0) ? result.data.blogs : [...this.blogListData, ...result.data.blogs];
        this.isShowViewMore = (result.data.blogs.length < this.params.limit) ? false : true;

      }
      else {

        this.blogListData = (this.blogListData.length > 0) ? this.blogListData : [];
        this.isShowViewMore = false
      }
      this.setMetaData();
    })
  }

  viewMoreBlogs() {
    this.params.offset = this.params.offset + this.params.limit;
    this.getBlogList();
  }

  setMetaData() {

    let metaInfo = new MetaInformation();

    let authorName = this.authorData.name ?? '';
    metaInfo.meta_title = authorName + ' author : Excellent Publicity';
    metaInfo.meta_description = authorName + ' author : Excellent Publicity';

    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? '';
    metaInfo.canonical_url = `${this.webURL}` + `${this.router.url}`;

    //og data           
    metaInfo.og_url = `${this.webURL}` + `${this.router.url}`;
    metaInfo.og_image = `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    this.commonService.setMetaData(metaInfo);

    //************************// 
    //   Google Tag Manager   //
    //************************//

    this.commonService.gtmPageEvents('Blog Listing', 'Blog');
  }
}
