export class AppURL {

    public static webURL = 'https://www.excellentpublicity.com';
    public static prefix  = 'https://getexcellentpublicity.com/api'; // STAGING ONLY: the only line that differs from app-url.ts
    // public static webURL = '';
    // public static prefix = 'api';
    public static version_1 = 'v1';
    public static version_2 = 'v2';
    
    static setUrl(media: string) {
        AppURL.media            = media;
        AppURL.mediaUrl         = AppURL.frontend + '/' + AppURL.media;
        AppURL.mediaConfigUrl   = AppURL.mediaUrl + '/' + 'config';
    }

    // user url start
    public static signUp_url                = AppURL.prefix + '/frontend/websignup';
    public static signIn_resendOtp_url      = AppURL.prefix + '/frontend/resendotp';
    public static signIn_otp_url            = AppURL.prefix + '/frontend/loginotp';
    public static signIn_url                = AppURL.prefix + '/frontend/websignin'; //websignin
    public static signOut_url               = AppURL.prefix + '/frontend/signout';
    public static authCheck_url             = AppURL.prefix + '/frontend/user/authcheck';
    public static user_url                  = AppURL.prefix + '/frontend/user';
    public static user_profile_url          = AppURL.prefix + '/frontend/user/profile';
    public static generateOtp_url           = AppURL.prefix + '/frontend/generateotp';
    
    public static frontend = AppURL.prefix + '/' + AppURL.version_1 + '/frontend';

    public static forbidden_domains_url = AppURL.frontend + '/forbiddenemaildomain';

    // frontend user
    /***************************    scart and payment process url     *********************************/

    public static couponCodeUrl                     = AppURL.frontend + '/couponcode';
    public static scart                             = AppURL.frontend + '/scart';
    public static scartcampaign                     = AppURL.frontend + '/scartcampaign';
    public static billingurl                        = AppURL.frontend + '/user/billing';
    public static useraddressurl                    = AppURL.frontend + '/user/address';
    public static paymentmethodinfourl              = AppURL.frontend + '/paymentmethodinfo';
    public static paymentprocessurl                 = AppURL.frontend + '/paymentprocess';
    public static razorpaypaymentsuccessurl         = AppURL.frontend + '/razorpaypaymentsuccess';

    public static manualPaymentDetailsurl           = AppURL.frontend + '/manualpayment/detail';
    public static manualPaymentProcessurl           = AppURL.frontend + '/manualpayment/paymentprocess';
    public static manualPaymentSuccessurl           = AppURL.frontend + '/manualpayment/paymentsuccess';
    public static manualPaymentFailurl              = AppURL.frontend + '/manualpayment/paymentfail';

    public static salesOrderPaymentProcessurl       = AppURL.frontend + '/salesorderpayment/paymentprocess';
    public static salesOrderPaymentSuccessurl       = AppURL.frontend + '/salesorderpayment/paymentsuccess';
    public static salesOrderPaymentFailurl          = AppURL.frontend + '/salesorderpayment/paymentfail';

    public static clientRateMyServiceDetailsurl     = AppURL.frontend + '/ratemyservice/clientdetail';
    public static vendorRateMyServiceDetailsurl     = AppURL.frontend + '/ratemyservice/vendordetail';
    public static admiUserListurl                   = AppURL.frontend + '/ratemyservice/adminuser';
    public static courierConfirmationReceivedurl    = AppURL.frontend + '/courierconfirmation/received';
    public static courierConfirmationNotReceivedurl = AppURL.frontend + '/courierconfirmation/notreceived';

    public static salesInvoiceDownloadUrl           = AppURL.prefix + '/' + 'salesinvoicedownload';

    /***************************    order url     *********************************/

    public static order_success_url                 = AppURL.frontend + '/ordersuccess';
    public static order_url                         = AppURL.frontend + '/order';

    /***************************    genaral url     *********************************/ 

    public static footer                    = AppURL.frontend + '/' + 'footer';
    public static teamexcellent             = AppURL.frontend + '/' + 'team';
    public static teamalbum                 = AppURL.frontend + '/' + 'team/album';
    
    public static trendingmedialist         = AppURL.frontend + '/' + 'trendingmedia';
    public static searchsite                = AppURL.frontend + '/' + 'searchsite';

    public static clientelelist             = AppURL.frontend + '/' + 'clientele';
    public static clientelecategorylist     = AppURL.frontend + '/' + 'clientele/category';

    public static testimonialslist          = AppURL.frontend + '/' + 'testimonial';

    public static setCurrencyUrl            = AppURL.frontend + '/' + 'setcurrency';

    /***************************    Page URLs   *********************************/

    public static landingPageUrl            = AppURL.frontend + '/' + 'landingpage';
    public static servicesPageUrl           = AppURL.frontend + '/' + 'services';

    public static advertisingUrl            = AppURL.frontend + '/' + 'advertising';

    public static countryPageUrl            = AppURL.frontend + '/' + 'countrypage';

    public static blogUrl                   = AppURL.frontend + '/' + 'blog';
    public static blogCategoryUrl           = AppURL.frontend + '/' + 'blog/category';
    public static newsUrl                   = AppURL.frontend + '/' + 'news';
    public static newsCategoryUrl           = AppURL.frontend + '/' + 'news/category';
    public static casestudyUrl              = AppURL.frontend + '/' + 'casestudy';
    public static casestudyCategoryUrl      = AppURL.frontend + '/' + 'casestudy/category';

    public static mediaplanUrl              = AppURL.frontend + '/' + 'mediaplan'; 
    public static mediaplanConfigUrl        = AppURL.frontend + '/' + 'mediaplan/config'; 

    public static inquiry                   = AppURL.frontend + '/' + 'inquiry';
    public static iplUrl                    = AppURL.frontend + '/' + 'ipl';
    public static sportUrl                  = AppURL.frontend + '/' + 'sports';
    public static worldcupUrl               = AppURL.frontend + '/' + 'worldcup';
    public static budgetestimatorUrl        = AppURL.frontend + '/' + 'budgetestimator';
    public static industryInsightsUrl       = AppURL.frontend + '/' + 'industryinsights';
    public static salesDeckUrl              = AppURL.frontend + '/' + 'salesdeck';

    public static contact                   = AppURL.inquiry + '/' + 'contact';
    public static hireaplanner              = AppURL.inquiry + '/' + 'hireaplanner';
    public static priceonrequest            = AppURL.inquiry + '/' + 'priceonrequest';
    public static career                    = AppURL.frontend + '/' + 'career';
    public static newsletter                = AppURL.inquiry + '/' + 'newsletter';
    
    /***************************    Media URLs   *********************************/

    public static media                     = '';
    public static mediaUrl                  = AppURL.frontend + '/' + AppURL.media;
    public static mediaConfigUrl            = AppURL.mediaUrl + '/' + 'config';
}


export class AppSettingspContent {
    public static webURL = 'https://www.excellentpublicity.com/content/assets';
    public static prefix = 'api';
}