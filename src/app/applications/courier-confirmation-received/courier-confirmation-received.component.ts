import { Component } from '@angular/core';
import { ShoppingCartService } from '@app-media-services';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from '@app-shared-services';

@Component({
    selector: 'app-courier-confirmation-received',
    templateUrl: './courier-confirmation-received.component.html',
    styleUrl: './courier-confirmation-received.component.css',
    standalone: false
})
export class CourierConfirmationReceivedComponent {

  token: string = '';
  form !: FormGroup;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute,
    public commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] ?? false;

      this.createForm();
      this.formSubmit();
    });

  }

  createForm() {
    this.form = new FormGroup({
      token: new FormControl(this.token),
      response: new FormControl('Received'),
    });
  }


  formSubmit() {

    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }

    let serviceData: any = [];
    serviceData['formData'] = this.form.value;

    this.shoppingCartService.courierConfirmationReceived(serviceData).subscribe(result => {
    });
  }

}
