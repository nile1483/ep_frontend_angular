export class MediaFilter {
  id: number;
  name: string;
  alias: string;
  sort_order: number;
  filter_type: string;

  constructor(options: {

    id?: number;
    name?: string;
    alias?: string;
    sort_order?: number;
    filter_type?: string;

  } = {}) {

    this.id = options.id || 0;
    this.name = options.name || '';
    this.alias = options.alias || '';
    this.sort_order = options.sort_order || 0;
    this.filter_type = options.filter_type || '';

  }
}


export class MediaLocation {

  id: number;
  zone: string;
  state: string;
  city: string;
  city_synonyms: string;
  city_unique_identifier: string;
  search_string: string;
  type: string;

  constructor(options: {

    id ?: number;
    zone ?: string;
    state ?: string;
    city ?: string;
    city_synonyms ?: string;
    city_unique_identifier ?: string;
    search_string ?: string;
    type ?: string;

  } = {}) {
   
    this.id = options.id || 0;
    this.zone = options.zone || '';
    this.state = options.state || '';
    this.city = options.city || '';
    this.city_synonyms = options.city_synonyms || '';
    this.city_unique_identifier = options.city_unique_identifier || '';
    this.search_string = options.search_string || '';
    this.type = options.type || '';
  }
}

export class MediaParm {
  filters: any;
  offset: number;
  sortBy: string;
  limit: number;
  optionType: string;
  path: string;

  constructor(options: {
    filters?: any;
    offset?: number;
    sortBy?: string;
    limit?: number;
    optionType?: string;
    path?: string;

  } = {}) {
    this.filters = options.filters || [];
    this.offset = options.offset || 0;
    this.sortBy = options.sortBy || '';
    this.limit = options.limit || 24;
    this.optionType = options.optionType || '';
    this.path = options.path || '';
  }
}

export class LocationParm {
  q: string;
  constructor(options: {
    q?: string;
  } = {}) {
    this.q = options.q || '';
  }
}