import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class InfilmParams extends MediaParm {
  override filters: InfilmFilters;
  
  constructor(options: {
    filters?: InfilmFilters;

  } = {}) {
    super();
    this.filters = options.filters || new InfilmFilters();
  }
}


export class InfilmFilters {

  location: MediaLocation[];
  in_film_type: MediaFilter[];
  genre: MediaFilter[];
  language: MediaFilter[];
  production_house: MediaFilter[];

  constructor(options: {

    location?: MediaLocation[];
    in_film_type?: MediaFilter[];
    genre?: MediaFilter[];
    language?: MediaFilter[];
    production_house?: MediaFilter[];

  } = {}) {

    this.location = options.location || [];
    this.in_film_type = options.in_film_type || [];
    this.genre = options.genre || [];
    this.language = options.language || [];
    this.production_house = options.production_house || [];

  }
}
