import { MediaFilter, MediaLocation, MediaParm } from "./media-config";

export class MonitoringtoolsParams extends MediaParm {
  override filters: MonitoringtoolsFilters;

  constructor(options: {
    filters?: MonitoringtoolsFilters;

  } = {}) {
    super();
    this.filters = options.filters || new MonitoringtoolsFilters();
  }
}


export class MonitoringtoolsFilters {

  constructor(options: {

  } = {}) {

  }
}
