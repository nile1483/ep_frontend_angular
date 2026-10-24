import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class NontraditionalParams extends MediaParm {
  override filters: NontraditionalFilters; 

  constructor(options: {
    filters?: NontraditionalFilters;
    
  } = {}) {
    super();
    this.filters = options.filters || new NontraditionalFilters(); 
  }
}


export class NontraditionalFilters {

  location: MediaLocation[];
  media_option: MediaFilter[];
  tier: MediaFilter[];


  constructor(options: {

    location?: MediaLocation[];
    media_option?: MediaFilter[];
    tier?: MediaFilter[];

  } = {}) {

    this.location = options.location || [];
    this.media_option = options.media_option || [];
    this.tier = options.tier || [];
  }
}
