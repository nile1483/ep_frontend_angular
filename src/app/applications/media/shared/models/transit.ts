import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class TransitParams extends MediaParm  {
  override filters: TransitFilters;
  
  constructor(options: {
    filters?: TransitFilters; 

  } = {}) {
    super();
    this.filters = options.filters || new TransitFilters(); 
  }
}


export class TransitFilters {

  location: MediaLocation[];
  tier: MediaFilter[];
  media_type: MediaFilter[];


  constructor(options: {

    location?: MediaLocation[];
    tier?: MediaFilter[];
    media_type?: MediaFilter[];

  } = {}) {

    this.location = options.location || [];
    this.tier = options.tier || [];
    this.media_type = options.media_type || [];
  }
}
