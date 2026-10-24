import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class DigitalParams extends MediaParm {
  override filters: DigitalFilters;

  constructor(options: {
    filters?: DigitalFilters;
  } = {}) {
    super();
    this.filters = options.filters || new DigitalFilters();
    
  }
}


export class DigitalFilters {

  location: MediaLocation[];
  category: MediaFilter[];
  language: MediaFilter[];
  pricing_model: MediaFilter[]; 

  constructor(options: {

    location?: MediaLocation[];
    category?: MediaFilter[];
    language?: MediaFilter[];
    pricing_model?: MediaFilter[]; 

  } = {}) {

    this.location = options.location || [];
    this.category = options.category || [];
    this.language = options.language || [];
    this.pricing_model = options.pricing_model || []; 

  }
}
