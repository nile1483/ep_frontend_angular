import { Component, EventEmitter, Inject, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoppingCartService } from '@app-media-services';
import { cloneDeep } from 'lodash-es';


@Component({
    selector: 'app-add-to-plan-dialog',
    templateUrl: './add-to-plan-dialog.component.html',
    styleUrls: ['./add-to-plan-dialog.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AddToPlanDialogComponent implements OnInit {

  priceData   : any = [];
  productData : any[] = [];
  item        : any;
  itemPrice   : any;
 
  //@Output() addToPlanEvent = new EventEmitter<any>();


  constructor(
    private shoppingCartService: ShoppingCartService,
    @Inject(MAT_DIALOG_DATA) public data: any = [],
  ) { 

  
  }

  ngOnInit(): void { 
    
  }  

  
  ngAfterViewInit(): void {
 
    if(this.data?.selectedPrice)
    {
      this.productData.push(cloneDeep(this.data)); 
      this.shoppingCartService.shoppingCartSub.next(this.productData);      
    }
  }   

}