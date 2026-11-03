import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ShoppingCartService } from '@app-media-services';
import { UserService } from './shared/services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})
export class AppComponent {
  title = 'Excellent Publicity';

  static isBrowser = new BehaviorSubject<boolean>(false);
  userDataObs!: Subscription;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: any
  ) 
  {
     
    AppComponent.isBrowser.next(isPlatformBrowser(platformId));

    this.userDataObs = this.userService.userData.subscribe(data => {
      this.userService.userInfo = data;
    });
  } 
  
  ngOnInit() { 
    if (this.userService.isUserAuthenticated == true) {
      this.userService.updateUserData();
    }

    this.shoppingCartService.updateShoppingCartData();
  }
  
  ngOnDestroy(): void {
    this.userDataObs.unsubscribe();
  }

}
