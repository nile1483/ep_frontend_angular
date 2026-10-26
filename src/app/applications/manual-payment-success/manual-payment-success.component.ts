import { Component, ChangeDetectionStrategy } from '@angular/core';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';

@Component({
    selector: 'app-manual-payment-success',
    templateUrl: './manual-payment-success.component.html',
    styleUrl: './manual-payment-success.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ManualPaymentSuccessComponent {

  app_svg_icon_list = APP_SVG_ICON_LIST;
  
}
