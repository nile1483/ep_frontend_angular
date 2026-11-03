import { Component } from '@angular/core';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
    selector: 'app-manual-payment-success',
    templateUrl: './manual-payment-success.component.html',
    styleUrl: './manual-payment-success.component.css',
    standalone: false
})
export class ManualPaymentSuccessComponent {

  app_svg_icon_list = APP_SVG_ICON_LIST;
  
}
