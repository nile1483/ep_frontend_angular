import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class NewspaperParams extends MediaParm {
  override filters: NewspaperFilters; 

  constructor(options: {
    filters?: NewspaperFilters;
    
  } = {}) {
    super();
    this.filters = options.filters || new NewspaperFilters(); 
  }
}


export class NewspaperFilters {

  location: MediaLocation[];
  language: MediaFilter[];
  publications: MediaFilter[];


  constructor(options: {

    location?: MediaLocation[];
    language?: MediaFilter[];
    publications?: MediaFilter[];

  } = {}) {

    this.location = options.location || [];
    this.language = options.language || [];
    this.publications = options.publications || [];
  }
}
