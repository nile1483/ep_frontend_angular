import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '@app-media-services';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { APP_SVG_ICON_LIST } from '@app-shared-constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '@app-shared-services';

@Component({
  selector: 'app-vendor-rate-my-service',
  templateUrl: './vendor-rate-my-service.component.html',
  styleUrl: './vendor-rate-my-service.component.css'
})
export class VendorRateMyServiceComponent {

  token: string = '';
  hasServiceData: boolean = false;
  rateSubmit: boolean = false;
  serviceDetails: any = null;
  rateMyServiceForm !: FormGroup;

  app_svg_icon_list = APP_SVG_ICON_LIST;
  ratingArr: number[] = []; // Define the type as an array of numbers
  @Input('starCount') public starCount: number = 5;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    public commonService: CommonService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }

    this.route.queryParams.subscribe(params => {
      this.token = params['token'] ?? false;
      this.getDetails(this.token);
      this.changePasswordCreateForm();
    });

  }

  changePasswordCreateForm() {
    this.rateMyServiceForm = new FormGroup({
      id: new FormControl(this.serviceDetails?.id),
      team_member_name: new FormControl('', [Validators.required]),
      your_network: new FormControl('Yes'),
      additional_remarks: new FormControl(''),
      overall_rating: new FormControl(0, [Validators.required, Validators.min(1)]),
      // expertise_rating: new FormControl(0, [Validators.required, Validators.min(1)]),
      // knowledge_rating: new FormControl(0, [Validators.required, Validators.min(1)]),
      // understanding_rating: new FormControl(0, [Validators.required, Validators.min(1)]),
      // turnaround_time_rating: new FormControl(0, [Validators.required, Validators.min(1)]),
      // relationship_building_rating: new FormControl(0, [Validators.required, Validators.min(1)]),
      // proactiveness_rating: new FormControl(0, [Validators.required, Validators.min(1)]),
    });
  }

  onClickStarRating(rating: number, type: string): void {
    this.rateMyServiceForm.get(type)?.setValue(rating);
  }

  getDetails(token: string) {
    this.loaderService.open();

    this.shoppingCartService.getVendorRateMyServiceDetails(token).subscribe(response => {
      this.loaderService.close();
      if (response.status == true) {
        this.serviceDetails = response.data;
        this.hasServiceData = true;
      }
    });
  }

  rateMyServiceSubmit() {

    this.rateMyServiceForm.markAllAsTouched();
    if (!this.rateMyServiceForm.valid) {
      return;
    }

    let data = this.rateMyServiceForm.value;
    // data.overall_rating = (
    //     data.expertise_rating +
    //     data.knowledge_rating +
    //     data.understanding_rating +
    //     data.turnaround_time_rating +
    //     data.relationship_building_rating +
    //     data.proactiveness_rating
    // ) / 6;
    
    // // Round to 2 decimal points
    // data.overall_rating = parseFloat(data.overall_rating.toFixed(2));

    let serviceData: any = [];
    serviceData['formData'] = data;

    this.shoppingCartService.vendorRateMyServiceUpdate(serviceData).subscribe(result => {
      if (result.status == true) {
        this.rateSubmit = true;
        this.commonService.openSnackBar('Your response is submitted');
        // this.router.navigate(['/user/campaign']);
      }
    });
  }

}
