import { Component } from '@angular/core';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
    selector: 'app-manual-payment-fail',
    templateUrl: './manual-payment-fail.component.html',
    styleUrl: './manual-payment-fail.component.css',
    standalone: false
})
export class ManualPaymentFailComponent {

  app_svg_icon_list = APP_SVG_ICON_LIST;
  
}
