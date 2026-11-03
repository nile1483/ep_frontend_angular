import { Component } from '@angular/core';
import { ShoppingCartService } from '@app-media-services';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from '@app-shared-services';

@Component({
    selector: 'app-courier-confirmation-not-received',
    templateUrl: './courier-confirmation-not-received.component.html',
    styleUrl: './courier-confirmation-not-received.component.css',
    standalone: false
})
export class CourierConfirmationNotReceivedComponent {

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
      response: new FormControl('Not Received'),
    });
  }


  formSubmit() {

    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }

    let serviceData: any = [];
    serviceData['formData'] = this.form.value;

    this.shoppingCartService.courierConfirmationNotReceived(serviceData).subscribe(result => {
    });
  }

}
