import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilities } from '@app-shared-helpers';
import { UserService } from '@app-shared-services';
import { MatDialogRef } from '@angular/material/dialog';
import { LoaderService } from '@app-shared-services';
import { CommonService } from '@app-shared-services';
import { APP_SVG_ICON_LIST} from '@app-shared-constants'; 
import { FORBIDDEN_EMAIL_DOMAINS } from 'src/app/shared/constants/forbidden-email-domain-list';
 
export function isPersonalEmailValidator(domainList: any)  {
 
  return (control: AbstractControl): ValidationErrors | null => {
    var emailTemp = control.value; 

    var email = (emailTemp.length > 0) ? emailTemp.toLowerCase() : emailTemp;
    var emailDomain = email.split('@').slice(1);
    var isValid = true;

    if (emailDomain.length > 0) {
      // let domains = emailDomain.map((domain :string) => domain.toLowerCase());
      var emailDomainFinal = emailDomain[0].split('.');
      var forbiddenDomains  = domainList;
      
      isValid = forbiddenDomains.indexOf(emailDomainFinal[0]) == -1;

    }
  
    return isValid ? null : { 'isPersonal': true }; 
  }
}

// export function isPersonalEmailValidator(control: UntypedFormControl) {

//   var emailTemp = control.value; 
//   var email = (emailTemp.length > 0) ? emailTemp.toLowerCase() : emailTemp;
  
//   var emailDomain = email.split('@').slice(1);
//   var isValid = true;
//   if (emailDomain.length > 0) {
    
//     var forbiddenDomains  = FORBIDDEN_EMAIL_DOMAINS;
     
//     isValid = forbiddenDomains.indexOf(emailDomain[0]) == -1;
//   } 

//   return isValid ? null : { 'isPersonal': true }; 
// }

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})


export class UserLoginComponent implements OnInit {

  app_svg_icon_list = APP_SVG_ICON_LIST;
  selectedCountry:any = { "name": "India", "dialCode": "+91", "code": "IN" };
  countryList:any = [];
  countryFilteredList:any = [];
  userRegistrationForm!: UntypedFormGroup;
  userInfo: any;
  display: any;
  isShowResendOtp = false;
  userVerificationForm!: UntypedFormGroup;
  searchCountry = '';
  
  userLoginForm!: UntypedFormGroup;
  userForgotPwdForm!: UntypedFormGroup;

  isVerified: boolean = false;
  submitted = false;
  userRegistrationError: any = { hasError: false, message: null, errors: [] };
  userLoginError: any;
  loginmessage: any;
  userForgot: any;
  tabIndex: number = 0;
  show: boolean = false;
  href :any = "";
  startTime = 0; // performance.now() -> milliseconds
  endTime  = 0;

  @Output('closeLoginPopup') closeLoginPopup = new EventEmitter<any>();
  @Input() media: string = '';
  @Input() inquiryPageURL: string = '';
  @Input() loginData!: any;

  constructor(
    private userService   : UserService, 
    private commonService : CommonService,
    private router        : Router,
    private loaderService : LoaderService,
    public dialogRef      : MatDialogRef<UserLoginComponent>,
  ) {
      this.href = this.router.url;
   }

  ngOnInit(): void {
    this.startTime =  performance.now(); 
    this.createForm();
    this.isVerified = true;
    this.userLoginError = false;
    this.tabIndex = 0; //reg
    //this.tabIndex = 1; //uer
    this.show = false;  
    this.userService.getCountryCodes().subscribe(response => {
      if (response?.status) {
         this.countryList = response?.data;
         this.countryFilteredList = response?.data;
      }
      else
      {
         this.countryList = [];
         this.countryFilteredList = [];
      }
       
    });
     
  }

  ngOnDestroy(): void {
    
  }

  private createForm() {

    this.userLoginForm = new UntypedFormGroup({
      username: new UntypedFormControl('', [Validators.required]),
    });

    this.userVerificationForm = new UntypedFormGroup({
      verificationCode: new UntypedFormControl('', [Validators.required, Validators.pattern('[1-9][0-9]{4}')]),
    });

    this.userRegistrationForm = new UntypedFormGroup({
      url: new UntypedFormControl(this.href, [Validators.required]),
      fullname: new UntypedFormControl('', [Validators.required, Validators.maxLength(50)]),
      // email: new UntypedFormControl('', [Validators.required, Validators.email]),
      email: new UntypedFormControl('', [Validators.required, Validators.email, isPersonalEmailValidator(this.userService.forbiddenDomainsList)]),
      contact: new UntypedFormControl('', [Validators.required]),
      city: new UntypedFormControl('', [Validators.required, Validators.maxLength(50)])
    });
    
  }


  getTimeDiff() {
    this.endTime = performance.now(); 
    let timeDiff =   Math.round((this.endTime - this.startTime) / 1000);
    return timeDiff;
    
  }
  onSearchChange(value:string){
    this.countryFilteredList =  this.countryList.filter((item:any) => (item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) || (item.dialCode.toLowerCase().indexOf(value.toLowerCase()) !== -1));
  }

  selectCountry(country :any)
  {
     this.selectedCountry = country; 
  }
 

  registrationFormSubmit() {
   
    this.userRegistrationForm.markAllAsTouched();
   
     if (this.userRegistrationForm.valid) {
      const userRegistrationData = this.userRegistrationForm.value;
      userRegistrationData.country =  this.selectedCountry;
      
      this.loaderService.open();
      this.userService.userRegistration(userRegistrationData).subscribe(response => {
        this.loaderService.close();
        if (!Utilities.isEmptyObj(response)) {
          if (response.status === true) {

            this.userRegistrationError.hasError = false;
            this.userRegistrationError.errors = [];
            this.loginmessage = response;
            this.tabIndex = 1;
            this.commonService.userLoginFormActive();
            this.isVerified = response['isVerified'];
            this.userInfo = response;
            this.isShowResendOtp = false;
            this.commonService.gtmLoginSignupEvents('sign_up',this.loginData.placement, this.loginData.productName, this.getTimeDiff(), response['id']);
            this.startTime = 0;
            this.timer(1);
          }
          else {

            this.userRegistrationError.hasError = true;
            this.userRegistrationError.message = response.message;
            this.userRegistrationError.errors = this.seterrors(response.errors);
          }
        }
        
      });

     }
     else
     {
      return;
     }
  }


  verificationFormSubmit() {

    this.userVerificationForm.markAllAsTouched();
    if (this.userVerificationForm.valid) {

      let serviceData: any = {};
      serviceData.verificationCode = this.userVerificationForm.value.verificationCode;
      serviceData.requestForm = this.userInfo.requestForm;
      serviceData.username = this.userInfo.username;
      this.loaderService.open();
      this.userService.userVerification(serviceData).subscribe(data => {
        this.loaderService.close();
        if (!Utilities.isEmptyObj(data['isVerified'])) {
          this.isVerified = data['isVerified'];
          this.loginmessage = data;
          this.userLoginError = null;
          // this.openSnackBar('Login', data.message);
          this.userService.setUserAuthenticated(true);
          this.commonService.openSnackBar(data.message); 
          this.userService.updateUserData();
          this.commonService.gtmLoginSignupEvents('login',this.loginData.placement, this.loginData.productName, this.getTimeDiff(), data['id']);
          this.dialogRef.close(true);
        }
        else {
          this.userLoginError = data;
          this.loginmessage = null;
        }

      });

    }
  } 

  loginFormSubmit() {
    this.userLoginForm.markAllAsTouched();
    if (!this.userLoginForm.valid) {
      return;
    }
    const userData = this.userLoginForm.value;
    userData.grant_type = 'password';
    userData.client_id = 5;
    userData.client_secret = 'DRmeMrWoSytxPJIQjijvhYadkvDe9bUayysLkoaM';
    userData.scope = '*'

    let serviceData: any = [];
    serviceData['formData'] = userData;

    this.loaderService.open();
    this.userService.loginOtp(serviceData).subscribe(response => {
      this.loaderService.close();
      if (response.status === true) {
        this.userLoginError = false;
        this.loginmessage = response;
        this.isVerified = response['isVerified'];
        this.userInfo = response;
        this.isShowResendOtp = false;
        this.timer(1);
      }
      else {
        this.userLoginError = (response.status == false) ? response.message : false;
      }

    });

  }



  resendOtp() {
    let serviceData: any = [];
    serviceData['formData'] = this.userLoginForm.value;

    this.userService.resendOtp(serviceData).subscribe(response => {
      if (response.status === true) {
        this.userLoginError = false;
        this.loginmessage = response;
        this.isVerified = response['isVerified'];
        this.userInfo = response;
        this.isShowResendOtp = false;
        this.timer(1);
      }
      else {
        this.userLoginError = (response.status == false) ? response.message : false;
      }

    });
  }

  // closePopup() {}

  profileUpdate() {}


  onBlurMethod(key: any) {
    this.userRegistrationError.errors[key] = null;
  }


  seterrors(errors: any) {
    let newErrors: any = {};
    errors.forEach((e: any) => {
      if (e.placement == "field") {
        newErrors[e.field] = e.message;
      }
    });

    return newErrors;
  }

  timer(minute: number) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${textSec}`;

      if (seconds == 0) {
        this.isShowResendOtp = true;
        clearInterval(timer);
      }
    }, 1000);
  }


  // openSnackBar(page: string, message: string) {
  //   this._snackBar.open(page, message, {
  //     duration: 2500,
  //     verticalPosition: "top",
  //     horizontalPosition: "center",
  //   });
  // }

  

}
