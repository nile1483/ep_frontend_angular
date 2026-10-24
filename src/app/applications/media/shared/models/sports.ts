import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class SportsParams extends MediaParm {
  override filters: SportsFilters;
  
  constructor(options: {
    filters?: SportsFilters;

  } = {}) {
    super();
    this.filters = options.filters || new SportsFilters();
  }
}


export class SportsFilters {

  location: MediaLocation[];
  category: MediaFilter[];
  language: MediaFilter[];
  gender: MediaFilter[];
  event_schedule: MediaFilter[];

  constructor(options: {

    location?: MediaLocation[];
    category?: MediaFilter[];
    language?: MediaFilter[];
    gender?: MediaFilter[];
    event_schedule?: MediaFilter[];

  } = {}) {

    this.location = options.location || [];
    this.category = options.category || [];
    this.language = options.language || [];
    this.gender = options.gender || [];
    this.event_schedule = options.event_schedule || [];

  }
}
