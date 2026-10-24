import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class ActivationParams extends MediaParm {
  override filters: ActivationFilters; 

  constructor(options: {
    filters?: ActivationFilters;
    
  } = {}) {
    super();
    this.filters = options.filters || new ActivationFilters(); 
  }
}


export class ActivationFilters {

  location: MediaLocation[];
  media_option: MediaFilter[];

  constructor(options: {

    location?: MediaLocation[];
    media_option?: MediaFilter[];
  } = {}) {

    this.location = options.location || [];
    this.media_option = options.media_option || [];
  }
}
