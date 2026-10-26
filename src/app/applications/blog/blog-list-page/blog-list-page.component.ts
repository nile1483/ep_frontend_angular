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
    selector: 'app-blog-list-page',
    templateUrl: './blog-list-page.component.html',
    styleUrls: ['./blog-list-page.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class BlogListPageComponent implements OnInit {

  linkName: any = '';
  app_svg_icon_list = APP_SVG_ICON_LIST;
  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['blog'];
  params: any = new BlogParams();
  blogCategoryList: any[] = [];
  blogListData: any[] = [];
  isShowViewMore: boolean = true;
  selectedCategory: string = 'all';
  selectedCategoryName: string = '';

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
    this.route.params.subscribe((x) => {
    
      this.params.type = this.checkLinkUrl();
      this.metaData = META_DATA[this.params.type];

      this.selectedCategory = (x["categoryName"] !== undefined) ? x["categoryName"] : 'all';
      this.params.category = this.selectedCategory;
      this.params.path = this.router.url;

      this.getBlogCategoryList();

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

  // get Blog Category List
  getBlogCategoryList() {
    this.blogService.getBlogCategoryList(this.linkName).subscribe(result => {
      if (result.status == true) {
        this.blogCategoryList = result.data;
      }
    })
  }

  // get Blog List
  getBlogList() {

    this.blogService.getBlogList(this.linkName, this.params).subscribe(result => {

      if (result.status == true) {
        this.blogListData = (this.blogListData.length == 0) ? result.data : [...this.blogListData, ...result.data];
        this.isShowViewMore = (result.data.length < this.params.limit) ? false : true;

      }
      else {

        this.blogListData = (this.blogListData.length > 0) ? this.blogListData : [];
        this.isShowViewMore = false
      }
      this.setMetaData();
    })
  }

  changeCategory(event: any) {
    this.selectedCategory = event.target.value;

    if (this.selectedCategory == "all") {

      if (this.linkName == 'news') {
        this.router.navigate(['/news']);
      }
      else {
        this.router.navigate(['/blog']);
      }
    }
    else {
      if (this.linkName == 'news') {
        this.router.navigate(['/news/category', this.selectedCategory], { relativeTo: this.route });
      }
      else {
        this.router.navigate(['/blog/category', this.selectedCategory], { relativeTo: this.route });
      }

    }

  }

  // load more data from api
  viewMoreBlogs() {
    this.params.offset = this.params.offset + this.params.limit;
    this.getBlogList();
  }

  setMetaData() {

    let metaInfo = new MetaInformation();

    if (this.selectedCategory == "all") {
      metaInfo.meta_title = this.metaData?.meta_title ?? '';
      metaInfo.meta_description = this.metaData?.meta_description ?? '';
    }
    else {
      let findIndex = this.blogCategoryList.findIndex(category => category.slug == this.selectedCategory);

      let categoryName = this.selectedCategory;
      if (findIndex >= 0) {
        categoryName = this.blogCategoryList[findIndex]?.name ?? this.selectedCategory;
      }

      this.selectedCategoryName = categoryName;

      metaInfo.meta_title = this.selectedCategoryName + ' : Excellent Publicity';
      metaInfo.meta_description = this.selectedCategoryName + ' : Excellent Publicity';
    }

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
