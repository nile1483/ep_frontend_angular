export class NewsParams  {
  category: string;
  author: string;
  offset: number;
  limit: number;
  path: string;

  constructor(options: {
    category?: string;
    author?: string;
    offset?: number;
    limit?: number;
    path?: string;

  } = {}) {
    this.category = options.category || 'all';
    this.author = options.author || '';
    this.offset = options.offset || 0;
    this.limit = options.limit || 12;    
    this.path = options.path || '';
  }
}