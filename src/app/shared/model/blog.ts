export class BlogParams  {
  category: string;
  author: string;
  offset: number;
  limit: number;
  path: string;
  type: string;

  constructor(options: {
    category?: string;
    author?: string;
    offset?: number;
    limit?: number;
    path?: string;
    type?: string;

  } = {}) {
    this.category = options.category || 'all';
    this.author = options.author || '';
    this.offset = options.offset || 0;
    this.limit = options.limit || 12;    
    this.path = options.path || '';
    this.type = options.type || '';
  }
}