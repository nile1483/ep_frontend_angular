import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class DigitalprParams extends MediaParm {
  override filters: DigitalprFilters;

  constructor(options: {
    filters?: DigitalprFilters;
    
  } = {}) {
    super();
    this.filters = options.filters || new DigitalprFilters();   
  }
}


export class DigitalprFilters {

  location: MediaLocation[];
  genre: MediaFilter[];
  language: MediaFilter[];
  price_model: MediaFilter[];


  constructor(options: {

    location?: MediaLocation[];
    genre?: MediaFilter[];
    language?: MediaFilter[];
    price_model?: MediaFilter[];

  } = {}) {

    this.location = options.location || [];
    this.genre = options.genre || [];
    this.language = options.language || [];
    this.price_model = options.price_model || [];
  }
}
