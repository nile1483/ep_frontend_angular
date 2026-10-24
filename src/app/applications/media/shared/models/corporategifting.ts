import { MediaFilter, MediaLocation, MediaParm } from "./media-config";
export class CorporategiftingParams extends MediaParm {
  override filters: CorporategiftingFilters;  

  constructor(options: {
    filters?: CorporategiftingFilters;    

  } = {}) {
    super();
    this.filters = options.filters || new CorporategiftingFilters();    
  }
}


export class CorporategiftingFilters {

  location: MediaLocation[];
  category: MediaFilter[];
  price_range: MediaFilter[];
  brand: MediaFilter[];
  purpose_of_gifting: MediaFilter[];

  constructor(options: {

    location?: MediaLocation[];
    category?: MediaFilter[];
    price_range?: MediaFilter[];
    brand?: MediaFilter[];
    purpose_of_gifting?: MediaFilter[];

  } = {}) {

    this.location = options.location || [];
    this.category = options.category || [];
    this.price_range = options.price_range || [];
    this.brand = options.brand || [];
    this.purpose_of_gifting = options.brand || [];
  }
}
