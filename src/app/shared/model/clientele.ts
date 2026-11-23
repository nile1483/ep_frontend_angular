export class ClienteleParams  {
  category: string;
  offset: number;
  limit: number;

  constructor(options: {
    category?: string;
    offset?: number;
    limit?: number;

  } = {}) {
    this.category = options.category || '';
    this.offset = options.offset || 0;
    this.limit = options.limit || 50;    
  }
}