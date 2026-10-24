import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class InfluencerParams extends MediaParm {
  override filters: InfluencerFilters;
   
  constructor(options: {
   filters?: InfluencerFilters;
   
  } = {}) {
    super();
    this.filters = options.filters || new InfluencerFilters();
  }
}


export class InfluencerFilters {

  location: MediaLocation[];
  category: MediaFilter[];
  platforms: MediaFilter[];


  constructor(options: {

    location?: MediaLocation[];
    category?: MediaFilter[];
    platforms?: MediaFilter[];

  } = {}) {

    this.location = options.location || [];
    this.category = options.category || [];
    this.platforms = options.platforms || [];
  }
}
