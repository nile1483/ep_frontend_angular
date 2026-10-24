import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class BtlParams extends MediaParm {
  override filters: BtlFilters;
  
  constructor(options: {
    filters?: BtlFilters;

  } = {}) {
    super();
    this.filters = options.filters || new BtlFilters();
  }
}


export class BtlFilters {

  location: MediaLocation[];
  type: MediaFilter[];

  constructor(options: {

    location?: MediaLocation[];
    type?: MediaFilter[];

  } = {}) {

    this.location = options.location || [];
    this.type = options.type || [];
  }
}
