import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class OutdoorParams extends MediaParm {
  override filters: OutdoorFilters; 

  constructor(options: {
    filters?: OutdoorFilters; 

  } = {}) {
    super();
    this.filters = options.filters || new OutdoorFilters(); 
  }
}


export class OutdoorFilters {

  location: MediaLocation[];
  illumination: MediaFilter[];
  media_type: MediaFilter[]; 
  category: MediaFilter[];

  constructor(options: {

    location?: MediaLocation[];
    illumination?: MediaFilter[];
    media_type?: MediaFilter[];
    category?: MediaFilter[];

  } = {}) {

    this.location = options.location || [];
    this.illumination = options.illumination || [];
    this.media_type = options.media_type || [];
    this.category = options.category || [];

  }
}
