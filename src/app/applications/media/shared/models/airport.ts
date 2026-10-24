import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class AirportParams extends MediaParm {
  override filters: AirportFilters;
  
  constructor(options: {
    filters?: AirportFilters;

  } = {}) {
    super();
    this.filters = options.filters || new AirportFilters();
  }
}


export class AirportFilters {

  location: MediaLocation[];
  airport_type: MediaFilter[];

  constructor(options: {

    location?: MediaLocation[];
    airport_type?: MediaFilter[];

  } = {}) {

    this.location = options.location || [];
    this.airport_type = options.airport_type || [];

  }
}
