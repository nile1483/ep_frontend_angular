import { MediaFilter, MediaLocation, MediaParm } from "./media-config";
export class MagazineParams extends MediaParm {
  override filters: MagazineFilters;  

  constructor(options: {
    filters?: MagazineFilters;    

  } = {}) {
    super();
    this.filters = options.filters || new MagazineFilters();    
  }
}


export class MagazineFilters {

  location: MediaLocation[];
  category: MediaFilter[];
  frequency: MediaFilter[];
  language: MediaFilter[];
  country: MediaFilter[];


  constructor(options: {

    location?: MediaLocation[];
    category?: MediaFilter[];
    frequency?: MediaFilter[];
    language?: MediaFilter[];
    country?: MediaFilter[];

  } = {}) {

    this.location = options.location || [];
    this.category = options.category || [];
    this.frequency = options.frequency || [];
    this.language = options.language || [];
    this.country = options.country || [];
  }
}
