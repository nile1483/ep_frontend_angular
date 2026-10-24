import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class InflightParams extends MediaParm {
  override filters: InflightFilters;
  
  constructor(options: {
    filters?: InflightFilters;     

  } = {}) {
    super();
    this.filters = options.filters || new InflightFilters();
  }
}


export class InflightFilters {

  location: MediaLocation[];
  airline : MediaFilter[];
  route   : MediaFilter[];


  constructor(options: {

    location?: MediaLocation[];
    airline ?: MediaFilter[];
    route   ?: MediaFilter[];

  } = {}) {

    this.location = options.location || [];
    this.airline  = options.airline || [];
    this.route    = options.route || [];
  }
}
