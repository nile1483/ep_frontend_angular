import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CommonService } from '@app-shared-services';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ShoppingCartService } from '@app-media-services';
import { UserService } from 'src/app/shared/services/user.service';
import { MetaInformation } from '@app-shared-model';
import { META_DATA } from '@app-shared-constants';
import { AppURL } from 'src/app/app-url';
import { APP_SVG_ICON_LIST} from '@app-shared-constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  app_svg_icon_list = APP_SVG_ICON_LIST;
  webURL: string = AppURL.webURL;
  metaData: any = META_DATA['profile'];
  showBillingAddress = true;
  isAuthenticated = true;
  isEditAddress = false;
  isAddAddress = false;
  billingAddressList:any =[];
  profileForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    contact: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required]),
    city: new UntypedFormControl('', [Validators.required]),
  });

  billingAddressForm = new UntypedFormGroup({
    id            : new UntypedFormControl(0),
    company_name  : new UntypedFormControl(''),
    full_name     : new UntypedFormControl('', [Validators.required]),
    address       : new UntypedFormControl('', [Validators.required]),
    city          : new UntypedFormControl('', [Validators.required]),
    state         : new UntypedFormControl('', [Validators.required]),
    zipcode       : new UntypedFormControl('', [Validators.required]),
  });

  errorMessage:any = '';
  userInfo:any = {};
  constructor(  
                private userService:UserService,
                private commonService: CommonService,
                private shoppingCartService: ShoppingCartService,
                private loaderService: LoaderService,
              ) { }

  ngOnInit(): void {
    this.setMetaData();
    this.setUserInfo();
   // this.getBillingAddress();
  }

  setUserInfo()
  {
    this.loaderService.open();
    this.userService.getProfile().subscribe(result => {
      this.loaderService.close();
        if (result.status == true) {
        this.userInfo = result.data;
        this.setFormData();
      } 
    });
  }

  getBillingAddress()
  {
    this.isAddAddress = false;
    this.showBillingAddress = true;
    this.loaderService.open();
    this.userService.getBillingAddress().subscribe(result => {
       this.loaderService.close();
        if (result.status == true) {
          this.billingAddressList = result.data;
      } 
    });
  }

  addNewAddress(isOpen: any) {
    if (isOpen) {
      this.isAddAddress = true;
      this.showBillingAddress = false;
    }
    else {
      this.isAddAddress = false;
      this.showBillingAddress = true;
    }
  }

  editAddress(addressId: number) {
    this.showBillingAddress = false;
    this.isAddAddress = true;
    let serviceData: any = [];
    serviceData['addressId'] = addressId;

    this.isEditAddress = true;

    this.loaderService.open();

    this.userService.editAddress(serviceData).subscribe(result => {

      this.loaderService.close();

      if (result.status == true) {
        let data = result.data;

        const formdata = {
          id:data.id,        
          full_name:data.fullname, 
          company_name:data.company_name, 
          address:data.address,   
          city:data.city,      
          state:data.state,     
          zipcode:data.zipcode,   
        }; 
        
        this.billingAddressForm.setValue(formdata);
      }
    });
  }

  
  addNewAddressSubmit() {
    this.billingAddressForm.markAllAsTouched();
    if (this.billingAddressForm.valid == true) {

      let serviceData: any = [];
      serviceData['formData'] = this.billingAddressForm.value;
      
      this.loaderService.open();

      this.shoppingCartService.addNewAddress(serviceData).subscribe(result => {
        
        this.loaderService.close();
        
        if (result.status == true) {
          this.getBillingAddress();
          this.commonService.openSnackBar('Billing Address Added Successfully');
          
          this.isAddAddress = false;
        }
      });
    }
  }

  editAddressSubmit() {

    this.billingAddressForm.markAllAsTouched();
    if (this.billingAddressForm.valid == true) {
      
      let serviceData: any = [];
      serviceData['formData'] = this.billingAddressForm.value;
      this.loaderService.open();

      this.shoppingCartService.updateAddress(serviceData).subscribe(result => {
       
        this.loaderService.close();

        if (result.status == true) {
          this.getBillingAddress();
          this.commonService.openSnackBar('Billing Address Update Successfully'); 
          this.isAddAddress = false;
        }

        this.isEditAddress = false;

      });
    }

  }

  

  removeAddress(addressId: number) {

    let serviceData: any = [];
    serviceData['addressId'] = addressId;
    
    this.loaderService.open();

    this.shoppingCartService.removeAddress(serviceData).subscribe(result => {
      this.loaderService.close();
      this.getBillingAddress();
      this.commonService.openSnackBar('Billing Address Delete Successfully');
    });
  }

  setFormData(){

      const data = {
        name : this.userInfo.name,
        email : this.userInfo.email,
        contact : this.userInfo.contact,
        city  : this.userInfo.city
      };

      if(data?.name && data?.email && data?.contact)
      {
        this.profileForm.setValue(data);
      }
      

  }

  updateProfileSubmit(){
    this.profileForm.markAllAsTouched();
    if (this.profileForm.valid == false) {
      return;
    }
    this.loaderService.open();
    this.userService.updateProfile(this.profileForm.value).subscribe(result => {
      this.loaderService.close();
      this.errorMessage = null;
      if (result.status == true) {
        this.setUserInfo();
      }
      else
      {
        this.setErrorMessage(result.message);
      }
    });


    
  }

  setErrorMessage(message:any){
    this.errorMessage = message;
    if ('email' in message) {
      this.profileForm.controls['email'].setErrors({'alredayExists': true});
    } else {
      this.profileForm.controls['email'].setErrors(null);
    }
     
    if ('contact' in message) {
      this.profileForm.controls['contact'].setErrors({'alredayExists': true});
    } else {
      this.profileForm.controls['contact'].setErrors(null);
    }
  }
  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? ''; 
    metaInfo.meta_description = this.metaData?.meta_description ?? ''; 
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? ''; 
    metaInfo.canonical_url = `${this.webURL}`+ `/user/campaign`;       
    this.commonService.setMetaData(metaInfo); 
 }
}
