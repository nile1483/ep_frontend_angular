import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class CinemaParams extends MediaParm {
  override filters: CinemaFilters;
  override limit: number;

  constructor(options: {
    filters?: CinemaFilters;
    limit?: number;

  } = {}) {
    super();
    this.filters = options.filters || new CinemaFilters();
    this.limit = options.limit || 24;
  }
}


export class CinemaFilters {

  location: MediaLocation[];
  audience_class: MediaFilter[];
  cinema_chain: MediaFilter[];
  screen_recomend: MediaFilter[];
  tier: MediaFilter[];

  constructor(options: {

    location?: MediaLocation[];
    audience_class?: MediaFilter[];
    cinema_chain?: MediaFilter[];
    screen_recomend?: MediaFilter[];
    tier?: MediaFilter[];

  } = {}) {

    this.location = options.location || [];
    this.audience_class = options.audience_class || [];
    this.cinema_chain = options.cinema_chain || [];
    this.screen_recomend = options.screen_recomend || [];
    this.tier = options.tier || [];

  }
}
