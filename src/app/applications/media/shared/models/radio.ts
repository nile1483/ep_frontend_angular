import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class RadioParams extends MediaParm {
  override filters: RadioFilters;
  
  constructor(options: {
    filters?: RadioFilters;

  } = {}) {
    super();
    this.filters = options.filters || new RadioFilters();
  }
}


export class RadioFilters {

  location: MediaLocation[];
  audience: MediaFilter[];
  language: MediaFilter[];
  station: MediaFilter[];
  tier: MediaFilter[];

  constructor(options: {

    location?: MediaLocation[];
    audience?: MediaFilter[];
    language?: MediaFilter[];
    station?: MediaFilter[];
    tier?: MediaFilter[];

  } = {}) {

    this.location = options.location || [];
    this.audience = options.audience || [];
    this.language = options.language || [];
    this.station = options.station || [];
    this.tier = options.tier || [];

  }
}
