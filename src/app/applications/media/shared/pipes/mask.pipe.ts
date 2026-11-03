import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mask',
    standalone: false
})
export class MaskPipe implements PipeTransform {

  transform(value: any): string {
    let m ='₹';
    for (let i = 0; i < value.toString().length; i++) {
      m = m +'X';
    }
    m = m + '.XX'
    return m;
  }

}