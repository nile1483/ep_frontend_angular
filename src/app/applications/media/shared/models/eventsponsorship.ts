import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class EventsponsorshipParams extends MediaParm {
  override filters: EventsponsorshipFilters;
  
  constructor(options: {
    filters?: EventsponsorshipFilters;

  } = {}) {
    super();
    this.filters = options.filters || new EventsponsorshipFilters();
  }
}


export class EventsponsorshipFilters {

  location: MediaLocation[];
  category: MediaFilter[];
  language: MediaFilter[];
  event_status: MediaFilter[];

  constructor(options: {

    location?: MediaLocation[];
    category?: MediaFilter[];
    language?: MediaFilter[];
    event_status?: MediaFilter[];

  } = {}) {

    this.location = options.location || [];
    this.category = options.category || [];
    this.language = options.language || [];
    this.event_status = options.event_status || [];

  }
}
