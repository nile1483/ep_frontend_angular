// SeoService Model
export class MetaInformation {
  meta_title:string;
  meta_description:string;
  meta_keywords:string;
  canonical_url:string;
  og_title:string;
  og_description:string;
  og_image:string;
  og_url:string;
  custom_page_type : 'Company' | 'Product Listing' | 'Product Detail';
  custom_media_type :any;
  twitter_title:string;
  twitter_description:string;
  twitter_image:string;
  twitter_url:string;
   

  constructor(options: {
    meta_title?:string;
    meta_description?:string;
    meta_keywords?:string;
    canonical_url?:string;
    og_title?:any;
    og_description?:any;
    og_image?:any;
    og_url?:any;
    custom_page_type?:any;
    custom_media_type?:any;
    twitter_title?:string;
    twitter_description?:string;
    twitter_image?:string;
    twitter_url?:string;

  } = {}) {

    this.meta_title = options.meta_title || '';
    this.meta_description = options.meta_description || '';
    this.meta_keywords = options.meta_keywords || '';
    this.canonical_url = options.canonical_url || '';
    this.og_title = options.og_title || null;
    this.og_description = options.og_description || null;
    this.og_image = options.og_image || null;
    this.og_url = options.og_url || null;
    this.custom_page_type = options.custom_page_type || "Company";
    this.custom_media_type = options.custom_media_type || null;
    this.twitter_title = options.twitter_title || '';
    this.twitter_description = options.twitter_description || '';
    this.twitter_image = options.twitter_image || '';
    this.twitter_url = options.twitter_url || '';

  }

}
