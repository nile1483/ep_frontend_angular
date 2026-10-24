import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class MallParams extends MediaParm {
  override filters: MallFilters;

  constructor(options: {
    filters?: MallFilters;    

  } = {}) {
    super();
    this.filters = options.filters || new MallFilters();
  }
}


export class MallFilters {

  location: MediaLocation[];
  constructor(options: {

    location?: MediaLocation[];

  } = {}) {

    this.location = options.location || [];

  }
}
