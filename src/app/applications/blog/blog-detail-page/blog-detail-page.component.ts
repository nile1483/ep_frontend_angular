import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { CommonService } from '@app-shared-services';
import { MetaInformation } from '@app-shared-model';
import { AppURL } from 'src/app/app-url';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PageService } from '../../page/page.service';
import { log } from 'node:console';

@Component({
  selector: 'app-blog-detail-page',
  templateUrl: './blog-detail-page.component.html',
  styleUrls: ['./blog-detail-page.component.css']
})
export class BlogDetailPageComponent implements OnInit {

  linkName: string = '';
  app_svg_icon_list = APP_SVG_ICON_LIST;
  webURL: string = AppURL.webURL;
  blogData: any = [];
  blogDescription: boolean = false;
  relatedPosts: boolean = false;
  alias: string = '';
  search_string: string = '';
  message: string = '';
  blogHasData: boolean = false;
  isDataLoaded: boolean = false;

  formSubmit: boolean = false;
  newsletterForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
  });

  callToActionData: CallToAction = {
    title: "Explore 5,00,00+ Media items rate in one click",
    inquiryUser: {}
  }
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private pageService: PageService,
  ) {
    this.route.params.subscribe((x) => {
      this.alias = x['alias'] || '';
      this.search_string = this.commonService.replaceDashWithSpace(this.alias);
    });

    this.linkName = this.router.url.split('/')[1];

    this.checkLinkUrl();
    // this.loadScript('//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-6411905f7e966f8d');
  }

  ngOnInit(): void {
    this.getBlogList();

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


  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  getBlogList() {
    this.blogService.getBlogDetail(this.linkName, this.alias).subscribe(result => {
      this.isDataLoaded = true;

      if (result.status == true) {
        this.blogHasData = true;

        this.blogData = result.data;
        if ('inquiryUser' in this.blogData) {
          this.callToActionData.title = "Contact Us For More Details";
          this.callToActionData.inquiryUser = this.blogData.inquiryUser;
        }

        this.blogDescription = result.description;
        this.relatedPosts = result.relatedPosts;
        
      }
      else {
        this.commonService.subSearchsite.next(this.search_string);
      }

      this.setMetaData();
    })
  }


  url: string = '';
  description: string = '';
  tags: string = '';
  image: string = '';

  setMetaData() {

    this.url = `${this.webURL}` + `${this.router.url}`,
      this.description = this.blogData?.meta_description;
    this.tags = this.blogData?.meta_title;
    this.image = this.blogData?.image ?? `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.blogData?.meta_title ?? '';
    metaInfo.meta_description = this.blogData?.meta_description ?? '';
    metaInfo.meta_keywords = this.blogData?.meta_keywords ?? '';
    metaInfo.canonical_url = `${this.webURL}` + `${this.router.url}`;

    //og data 
    metaInfo.og_url = `${this.webURL}` + `${this.router.url}`;
    metaInfo.og_title = this.blogData?.meta_title ?? null;
    metaInfo.og_description = this.blogData?.meta_description ?? null;
    metaInfo.og_image = this.blogData?.image ?? `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';


    //twitter data 
    metaInfo.twitter_url = `${this.webURL}` + `${this.router.url}`;
    metaInfo.twitter_title = this.blogData?.meta_title ?? null;
    metaInfo.twitter_description = this.blogData?.meta_description ?? null;
    metaInfo.twitter_image = this.blogData?.image ?? `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    this.commonService.setMetaData(metaInfo);

    //************************// 
    //   Google Tag Manager   //
    //************************//

    this.commonService.gtmPageEvents('Blog Detail', 'Blog');
  }


  newsletterFormSubmit() {

    this.newsletterForm.markAllAsTouched();

    if (!this.newsletterForm.valid) {
      return;
    }

    let serviceData: any = [];
    serviceData['formData'] = this.newsletterForm.value;


    this.pageService.subscribeNewsletter(serviceData).subscribe(result => {
      if (result.status == true) {
        this.message = result.message;
        this.formSubmit = true;
      }
    });

  }

  // shareData: {
  //   url: string;
  //   description?: string;
  //   tags?: string;
  //   image?: string;
  // } = {
  //   url: `${this.webURL}`+ `${this.router.url}`,
  //   description: this.blogData?.meta_description,
  //   tags: this.blogData?.meta_title,
  //   image: this.blogData?.image ?? `${this.webURL}`+ '/assets/logo/excellent-logo-footer.webp'
  // };


  // facebookLink  = `https://www.facebook.com/sharer.php?u=${this.shareData?.url}`;
  // twitterLink   = `https://twitter.com/intent/tweet?url=${this.shareData?.url}&text=${this.shareData?.description}&hashtags=${this.shareData?.tags}`;
  // linkedinLink  = `https://www.linkedin.com/sharing/share-offsite/?url=${this.shareData?.url}&text=${this.shareData?.description}&hashtags=${this.shareData?.tags}`;
  // whatsappLink  = `https://wa.me?text=${this.shareData?.url}`;


  setFacebookLink() {
    var url = `https://www.facebook.com/sharer.php?u=${this.url}`;
    return window.open(url);
  }

  setTwitterLink() {
    var url = `https://twitter.com/intent/tweet?url=${this.url}&text=${this.description}&hashtags=${this.tags}`;
    return window.open(url, 'TwitterWindow');
  }

  setLinkedinLink() {
    var url = `https://www.linkedin.com/sharing/share-offsite/?url=${this.url}&text=${this.description}&hashtags=${this.tags}`;
    return window.open(url);
  }

  setWhatsappLink() {
    var url = `https://wa.me?text=${this.url}`;
    return window.open(url);
  }


}

