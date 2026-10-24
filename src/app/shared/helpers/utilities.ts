export class Utilities {
  static isEmptyObj(item:any) { 
    return Utilities.isUndefined(item) || Utilities.isNull(item) || item.length === 0;
  }
  
  static isEmptyStr(item:any) {
    return Utilities.isNull(item) || item.length === 0 || item === '';
  }

  static isEmptyWithTrim(item:any) {
    return Utilities.isNull(item) || item.length === 0 || item.trim() === '';
  }

  static isNull(item:any) {
    return item === null;
  }

  static isUndefined(item:any) {
    return item === undefined;
  }

  static isMultipleOfStep (step:any, value:any) {
    return   (value % step) === 0 || step === 0 ;
  }

  static isValidMinimumValue (value:any,min:any) {
    return Number(value) >= min ;
  }

  static isValidMaximumValue (value:any,max:any) {
    return Number(value) > max ;
  }

  static findIndexOfFilterValue(filterList:any, filter: any, value: any) {
    return  filterList[filter].values.findIndex((x: any) => x.name === value);
  }
  
  static setAddToPlanData(mediaDetail:any, price: any) {

    let mediaData: any = {};
    mediaData['id']    = mediaDetail.id;
    mediaData['uid']   = price.sku;
    mediaData['sku']   = mediaDetail.sku;
    mediaData['name']  = mediaDetail.name;
    mediaData['slug']  = mediaDetail.slug;
    mediaData['image'] = mediaDetail.image;
    mediaData['media'] = mediaDetail.media;
    mediaData['selectedPrice'] = price;

    return mediaData;
  }

  static formatBytes(bytes = 0, decimals = 2) 
    {
      if (bytes === 0) {
        return '0 Bytes';
      }

      const k = 1024;
      const dm = decimals <= 0 ? 0 : decimals || 2;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  
  
//@ = &#64;
}
