// Team Model
export class Team {
  
  id: number;
  name: string;
  designation: string;
  designation_2: string;
  image: string;
  level: number;

  constructor(options: {
    id ?: number;
    name ?: string;
    designation ?: string;
    designation_2 ?: string;
    image ?: string;
    level ?: number;

  } = {}) {

    this.id = options.id || 0 ;
    this.name = options.name || '' ;
    this.designation = options.designation  || '' ;
    this.designation_2 = options.designation_2  || '' ;
    this.image = options.image  || '' ;
    this.level = options.level  || 0 ;

  }

}

// Category Clientele Model
export class CategoryClientele {

  id: number;
  name: string; 

  constructor(options: {

    id ?: number;
    name ?: string; 

  } = {}) {

    this.id = options.id || 0;
    this.name = options.name || '';

  }
}


export class Clientele {

  id: number;
  label: string; 
  image: string; 
  category: number[]; 

  constructor(options: {

    id ?: number;
    label ?: string; 
    image ?: string; 
    category ?: number[]; 

  } = {}) {

    this.id = options.id || 0;
    this.label = options.label || '';
    this.image = options.image || '';
    this.category = options.category || [];

  }
}


// career Model
export class Career {

  id: number;
  title: string; 
  detail: string; 

  constructor(options: {

    id ?: number;
    title ?: string; 
    detail ?: string; 

  } = {}) {

    this.id = options.id || 0;
    this.title = options.title || '';
    this.detail = options.detail || '';

  }
}
