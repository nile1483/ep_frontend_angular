import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class AitoolsParams extends MediaParm {
  override filters: AitoolsFilters;

  constructor(options: {
    filters?: AitoolsFilters;

  } = {}) {
    super();
    this.filters = options.filters || new AitoolsFilters();
  }
}


export class AitoolsFilters {

  category: MediaFilter[];

  constructor(options: {

    category?: MediaFilter[];

  } = {}) {

    this.category = options.category || [];
  }
}
