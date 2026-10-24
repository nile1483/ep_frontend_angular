import { Component, OnInit } from '@angular/core';
import { LOCAL_STORAGE } from 'src/app/shared/constants/local-storage';
import { LocalstorageService } from 'src/app/shared/services/localstorage.service';
import { ShoppingCartService } from '@app-media-services';
import { UserService } from 'src/app/shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  cartData:any = [];
  cartTotalPrice:number = 0;
  isAuthenticated: boolean = false;
  userDataObs!: Subscription;
  
  constructor( 
                private shoppingCartService: ShoppingCartService,  
                private localstorageService: LocalstorageService,  
                private userService:UserService,
                ) {

                  this.isAuthenticated = this.userService.isAuthenticated; 
                  this.userDataObs = this.userService.userData.subscribe(data => {
                    this.isAuthenticated = this.userService.isAuthenticated; 
                  });
                }

  ngOnInit() { 


    let item = this.localstorageService.getItem(LOCAL_STORAGE.addtoplan); 
    this.cartData = (item != null) ? JSON.parse(item) : [];
    
    this.countTotalPrice(); 
     
  }

  countTotalPrice() {
      
    this.cartTotalPrice = this.cartData.reduce((accumulator:number, obj :any) => {
      return accumulator + obj.selectedPrice.grandTotal;
    }, 0);
  }

  deleteItem(index:number){
     
      this.cartData.splice(index, 1); 

      this.localstorageService.setItem(LOCAL_STORAGE.addtoplan,JSON.stringify(this.cartData)); 

       this.shoppingCartService.updateShoppingCartData();

       this.countTotalPrice();
    
  }

  ngOnDestroy(): void {
    this.userDataObs.unsubscribe();
  }
}
