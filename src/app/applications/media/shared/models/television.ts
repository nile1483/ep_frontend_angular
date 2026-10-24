import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class TelevisionParams extends MediaParm {
  override filters: TelevisionFilters; 

  constructor(options: {
    filters?: TelevisionFilters; 

  } = {}) {
    super();
    this.filters = options.filters || new TelevisionFilters(); 
  }
}


export class TelevisionFilters {

  location: MediaLocation[];
  channel_genre: MediaFilter[];
  language: MediaFilter[];


  constructor(options: {

    location?: MediaLocation[];
    channel_genre?: MediaFilter[];
    language?: MediaFilter[];

  } = {}) {

    this.location = options.location || [];
    this.channel_genre = options.channel_genre || [];
    this.language = options.language || [];
  }
}
