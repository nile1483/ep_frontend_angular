import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Utilities } from '@app-shared-helpers';
import { CommonService } from '@app-shared-services';
import { ShoppingCartService } from '@app-media-services';
import { differenceWith, isEqual, isEmpty } from 'lodash-es';
import { findIndex, flattenDeep, uniq } from 'lodash-es';
import { LOCAL_STORAGE } from '@app-shared-constants';
import { AddToPlanDialogComponent } from '@app-media-shared-components';
import { MatDialogRef } from '@angular/material/dialog';
import { LocalstorageService } from '@app-shared-services';
import { Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css'],
    standalone: false
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartData: any = [];
  hasMinPriceFlag = false;
  hasPriceUnitFlag = false;
  isEditShoppingCart: boolean = false;
  shoppingCartObs!: Subscription;
  shoppingCartForm!: FormGroup;
  options!: FormArray;
  attributes!: FormArray;
  price_units!: FormArray;
  isFormCreated: boolean = false;

  selectedCurrency: any;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private commonService: CommonService,
    private cdRef: ChangeDetectorRef,
    private localstorageService: LocalstorageService,
    public dialogRef: MatDialogRef<AddToPlanDialogComponent>
  ) {
    this.shoppingCartData = this.shoppingCartService.shoppingCartData;
    this.shoppingCartObs = this.shoppingCartService.shoppingCartSub.subscribe(data => {
      this.shoppingCartData = data;

      this.setShoppingCartData();
    });

  }

  ngOnInit() {
    //Currency
    this.selectedCurrency = this.commonService.getSelectedCurrency();
    this.commonService.getCurrency().subscribe(currency => {
      this.selectedCurrency = this.commonService.getSelectedCurrency();
    });

    this.isEditShoppingCart = this.shoppingCartService.isEditCart;
  }

  get attributeForm() {
    return this.shoppingCartForm.controls['attribute'] as FormGroup;
  }
  //createShoppingCartForm start 
  createShoppingCartForm() {
    let selectedPrice = this.shoppingCartData[0].selectedPrice;
    let attributes = (selectedPrice?.attribute) ?? [];
    let priceUnits = (selectedPrice?.price_unit) ?? [];
    let options = (selectedPrice?.option) ?? [];

    let cmsForm: any = {};
    cmsForm['attribute'] = new FormGroup(this.setAttributeControls(attributes));
    cmsForm['priceUnit'] = new FormGroup(this.setPriceUnitControls(priceUnits));
    cmsForm['options'] = new FormGroup(this.setOptionsControls(options));

    this.shoppingCartForm = new FormGroup(cmsForm);
    this.isFormCreated = true;
    this.shoppingCartForm.valueChanges.subscribe(newValue => {
      this.shoppingCartForm.markAllAsTouched();      
      this.updateShoppingCartData(newValue);
    });
  }

  setAttributeControls(attributes: any) {
    let fieldsCtrls: any = {};
    if (attributes != false) {
      for (let f of attributes) {
        fieldsCtrls[f.code] = new FormControl(f.value || '', Validators.required);
      }
    }
    return fieldsCtrls;
  }

  setPriceUnitControls(priceUnits: any) {
    let fieldsCtrls: any = {};
    if (priceUnits != false) {
      for (let f of priceUnits) {
        fieldsCtrls[f.code] = new FormControl(f.value || '', [Validators.required, Validators.min(f.minimum_value), Validators.max(f.maximum_value)]);
      }
    }
    return fieldsCtrls;
  }

  setOptionsControls(options: any) {
    let fieldsCtrls: any = {};
    if (options != false) {
      for (let f of options) {
        fieldsCtrls[f.code] = new FormControl(f.value.name || '', Validators.required);
      }
    }
    return fieldsCtrls;
  }


  //createShoppingCartForm end

  updateShoppingCartData(formdata: any) {

    let attributes = !(this.isEmptyObject(formdata['attribute'])) ? formdata['attribute'] : false;
    let priceUnits = !(this.isEmptyObject(formdata['priceUnit'])) ? formdata['priceUnit'] : false;
    let options = !(this.isEmptyObject(formdata['options'])) ? formdata['options'] : false;

    if (attributes != false) {
      this.updateAttributeData(attributes);
    }

    if (options != false) {
      this.updateOptionsData(options);
    }

    if (priceUnits != false) {
      this.updatePriceUnitsData(priceUnits);
    }
  
    if (this.shoppingCartForm.valid) {
      this.checkPriceData();
    }
  }


  updateAttributeData(attributes: any) {
    this.shoppingCartData[0].selectedPrice.attribute.forEach((attr: any) => {
      if (attr.code in attributes) {
        attr.value = attributes[attr.code]
      }
    });
  }

  updateOptionsData(options: any) {
    let priceOptions = this.shoppingCartData[0].selectedPrice.option;
    priceOptions.forEach((pOption: any) => {
      if (pOption.code in options) {
        let index = pOption.values.findIndex((o: any) => o.name === options[pOption.code]);
        if (index >= 0) {
          pOption.value = pOption.values[index];
        }
      }
    });
  }

  updatePriceUnitsData(priceUnits: any) {
    this.shoppingCartData[0].selectedPrice.price_unit.forEach((punit: any) => {
      if (punit.code in priceUnits) {
        punit.value = Number(priceUnits[punit.code]);        
      }
    });
  }

  get isDisabledAddToPlanButton() {
    return (this.hasMinPriceFlag == true) ? true : ((this.hasPriceUnitFlag == true) ? true : !this.shoppingCartForm.valid);
  }
  // shopping cart  
  checkPriceData() {
    this.shoppingCartData.forEach((element: any, index: number) => {
      this.changePriceUnit(index)
    });
  }

  setShoppingCartData() {

    if (!this.shoppingCartData) {
      return;
    }
   
    this.shoppingCartData.forEach((product: any, index: any) => {

      if (!Utilities.isEmptyObj(product['selectedPrice'])) {

        product['selectedPrice']['optionPrice'] = Number(product['selectedPrice']['offer_rate']);

        /////////////////////// PriceUnit /////////////////////////////////
        let priceData: any = [];

        product['selectedPrice']['price_unit'].forEach((priceUnit: any) => {
          priceData.push(this.createPriceUnitObject(priceUnit));
        });

        product['selectedPrice']['price_unit'] = priceData;

        ///////////////////// attribute //////////////////////// 
        let variantData: any = [];

        if (product['selectedPrice']['attribute'] != false) {
          product['selectedPrice']['attribute'].forEach((attribute: any) => {
            variantData.push(this.createAttributeObject(attribute));
          });
        }
        product['selectedPrice']['attribute'] = variantData;

        ///////////////////// option ////////////////////////
        if (product['selectedPrice']['option'] != false) {

          let optionData: any = [];

          product['selectedPrice']['option'].forEach((option: any) => {
            optionData.push(this.createPriceOptionObject(option));
          });

          product['selectedPrice']['option'] = optionData;
        }
      }

      this.cdRef.detectChanges();

    });

    this.changePriceParameters(null);
    this.createShoppingCartForm();
    this.cdRef.detectChanges();
  }

  changePriceUnit(pIndex: number) {
    this.hasPriceUnitFlag = false;
    this.shoppingCartData[pIndex].selectedPrice.price_unit.forEach((priceUnit: any) => {
      if (!Utilities.isValidMinimumValue(priceUnit.value, priceUnit.minimum_value)) {
        this.hasPriceUnitFlag = true;
      }
      else if (Utilities.isValidMaximumValue(priceUnit.value, priceUnit.maximum_value)) {
        this.hasPriceUnitFlag = true;
      }
    });

    if (!this.hasPriceUnitFlag) {
      this.changePriceParameters(null);
    }
  }

  changePriceOption(value: any, productIndex: any, opIndex: any, type: string) {

    if (type == "dropdown") {
      value = value.value
    }
    this.shoppingCartData.forEach((product: any, index: any) => {

      if (productIndex == index) {

        let option: any = product.selectedPrice.option[opIndex];

        let findIndex = option.values.findIndex((x: any) => (x.name).toLowerCase() === (value['name']).toLowerCase());
        if (findIndex >= 0) {
          option.values.forEach((value: any, index: number) => {
            value['isselected'] = (findIndex == index);
          });

          option['value'] = option['values'][findIndex];
        }
      }
    });

    this.changePriceParameters(null);
  }

  changePriceParameters(selAttribute: any) {
    this.hasMinPriceFlag = false;
    this.shoppingCartData.forEach((product: any, index: any) => {
      
      const qtyList = product['selectedPrice']['price_unit'];
      const qtyData = this.multiplyArrayObj(qtyList);
      const otherPrice = product['selectedPrice']['variant'];

      if (!Utilities.isNull(selAttribute)) {
        this.checkvariantValue(selAttribute, otherPrice);
      }

      // priceunits
      let priceunits: any = [];
      product['selectedPrice']['price_unit'].forEach((element: any) => {
        priceunits.push({ name: element.name, value: element.value });
      });

      // variants
      let variants: any = [];

      if (!Utilities.isEmptyObj(product['selectedPrice']['attribute'])) {
        product['selectedPrice']['attribute'].forEach((element: any) => {
          variants.push({ attribute: element.name, value: element.value });
        });
      }

      for (let index = 0; index < otherPrice.length; index++) {
        const z = otherPrice[index];
        if (this.isArrayEqual(z.combination, variants)) {
          product['selectedPrice']['optionPrice'] = z.price;
        }
      }

      //  options
      let options: any = [];
      let optionPriceSum = 0;
      if (product['selectedPrice']['option'] != false) {
        for (let i = 0; i < product['selectedPrice']['option'].length; i++) {
          let option = product['selectedPrice']['option'][i];
          optionPriceSum = optionPriceSum + option['value']['price'];
          options.push({ name: option['name'], value: option['value']['name'], price: option['value']['price'] });
        }
      }

      // price break
      if(product['selectedPrice']['price_break'] != false) {

        let priceBreaks = product['selectedPrice']['price_break'];
        
          let breakPriceObj: any = null;
          for (let i = 0; i < priceBreaks.length; i++) {
            const breakPoint = priceBreaks[i];
            if (qtyData >= breakPoint.quantity) {
              breakPriceObj = breakPoint;
            } else {
              break;
            }
          }

          if(breakPriceObj == null) {
            breakPriceObj = priceBreaks[0];
          }

          product['selectedPrice']['optionPrice'] = breakPriceObj.price;
      }

      const gst = product['selectedPrice']['gst'];
      const subTotal = product['selectedPrice']['optionPrice'] * qtyData;
      const additionalPrice = optionPriceSum;
      const total = subTotal + additionalPrice;
      const totalGst = (total * (gst / 100));

      product['selectedPrice']['additionalPrice'] = additionalPrice;
      product['selectedPrice']['quantity'] = qtyData;
      product['selectedPrice']['subTotal'] = subTotal;
      product['selectedPrice']['total'] = total;
      product['selectedPrice']['totalGst'] = totalGst;
      product['selectedPrice']['grandTotal'] = total + totalGst;

      product['selectedPrice']['applied_priceunit'] = priceunits;
      product['selectedPrice']['applied_variant'] = variants;
      product['selectedPrice']['applied_options'] = options;

      product['selectedPrice']['minPriceFlag'] = false;

      if (product['selectedPrice']['minimum_billing'] && product['selectedPrice']['minimum_billing'] > 0) {
        if (product['selectedPrice']['subTotal'] < product['selectedPrice']['minimum_billing']) {
          product['selectedPrice']['minPriceFlag'] = true;
          this.hasMinPriceFlag = true;
        }
      }

    });

    this.cdRef.detectChanges();
  }

  resetAttribute(attribute: any) { 
    for (let index = 0; index < attribute.isOptionDisabled.length; index++) {
      attribute.isOptionDisabled[index] = false;
    }
  }

  changeAttributeValue(selAttribute: any){
     
    this.shoppingCartData.forEach((product: any, index: any) => {
      product['selectedPrice']['attribute'].forEach((attribute: any) => {
        if (attribute.name === selAttribute.name) {           
          if (attribute.values.includes(selAttribute.value)) {
            attribute.value = selAttribute.value;
          }
          else {
            attribute.value = selAttribute.defaultValue;
          }
        }
      });
       
      this.changePriceParameters(selAttribute);

    });
  }


  checkvariantValue(variant: any, otherPrice: any) {

    var varCobination = otherPrice.filter((f: any) => f.price > 0)    /* filter price  greter then 0 */
      .map((x: any) => x.combination)            /* map each price to combination */

    var findCobination: any = [];
    varCobination.forEach((element: any, index: number) => {

      let obj = element.find((o: any) => o.attribute === variant.name && o.value === variant.value);
      if (!Utilities.isUndefined(obj)) {
        findCobination.push(varCobination[index]);
      }
    });

    var finalVar: any = {}
    if (findCobination.length > 0) {

      flattenDeep(findCobination).forEach((element: any) => {
        let key = element.attribute;
        if (key in finalVar) {
          if (findIndex(finalVar.key, element.value) === -1) {
            finalVar[key].push(element.value);
            finalVar[key] = uniq(finalVar[key]);
          }
        }
        else {
          finalVar[key] = [];
          finalVar[key].push(element.value);
        }
      });
    }

    this.shoppingCartData.forEach((product: any, index: any) => {

      product['selectedPrice']['attribute'].forEach((v: any) => {

        if (v.name != variant.name) {
          v.values.forEach((value: any, valueIndex: any) => {
            const index = finalVar[v.name].findIndex((fv: any) => fv === value);
            v.isOptionDisabled[valueIndex] = (index > -1) ? false : true;
          });

          const varInd = finalVar[v.name].findIndex((fv: any) => fv === v.value);
          if (varInd === -1) {
            v.value = finalVar[v.name][0];
            this.attributeForm.controls[v.code].setValue(v.value)
             
            
          }
        }
      });

    });
 
  }

  //////////////////////////

  createAttributeObject(attribute: any) {

    return {
      code: (attribute['name'].toLowerCase()).replace(/\s/g, ""),
      name: attribute['name'],
      type: (attribute['type'] == 'dropdown') ? 'dropdown-attribute' : 'radio-attribute',
      value: (attribute?.value) ? attribute['value'] : attribute['defaultValue'] || null,
      values: attribute['values'],
      placeholder: attribute['name'],
      defaultValue: attribute['defaultValue'] || null,
      isOptionDisabled: Array(attribute['values'].length).fill(false),
      isDisabled: false
    }
  }

  createPriceUnitObject(priceUnit: any) {
    return {
      code: priceUnit['code'].toLowerCase(),
      name: priceUnit['name'],
      step: priceUnit['step'],
      type: 'number',
      placeholder: priceUnit['name'],
      minimum_value: (priceUnit['minimum_value'] > 1) ? priceUnit['minimum_value'] : 1,
      maximum_value: (priceUnit['maximum_value'] > 0) ? priceUnit['maximum_value'] : 99999999,
      value: (priceUnit?.value) ? priceUnit.value : ((priceUnit['minimum_value'] > 1) ? priceUnit['minimum_value'] : 1),
      message: null,
      isDisabled: false
    }
  }

  createPriceOptionObject(option: any) {

    let tempData: any = {
      code: (option['name'].toLowerCase()).replace(/\s/g, ""),
      name: option['name'],
      type: (option['type'] == 'dropdown') ? 'dropdown-option' : 'radio-option',
      uid: option['uid'],
      value: (option?.value) ? option['value'] : null,
      values: option['values'],
      sort_order: option['sort_order'],
      placeholder: option['name'],
      isDisabled: false
    };

    let tempValues: any[] = [];
    let isdefault: boolean = false;
    let isselected: boolean = false;

    option.values.forEach((opvalue: any) => {

      isdefault = (Number(opvalue['default']) == 1) ? true : false;
      let tempvalue: any = {
        name: opvalue['name'],
        price: (opvalue['modify_price'] == 'decrement' && opvalue['price'] > 0) ? (-(opvalue['price'])) : opvalue['price'],
        default: opvalue['default'],
        isdefault: isdefault,
        isselected: isselected,
        sort_order: opvalue['sort_order'],
        modify_price: opvalue['modify_price']
      };

      if (isdefault) {
        tempvalue['isselected'] = true;
        tempData['value'] = tempvalue;
      }

      tempValues.push(tempvalue);
    });

    if ('value' in option) {
      let findIndex = tempValues.findIndex(x => (x.name).toLowerCase() === (option['value']['name']).toLowerCase());
      if (findIndex >= 0) {
        tempData['value'] = tempValues[findIndex];
        tempValues.forEach((value: any, index: number) => {
          value['isselected'] = (findIndex == index);
        });
      }
    }

    tempData['values'] = tempValues;

    return tempData;
  }

  multiplyArrayObj(array: any) {
    let sum = 1;
    for (let i = 0; i < array.length; i++) {
      sum = sum * array[i].value;
    }
    return sum;
  }

  isArrayEqual(x: any, y: any) {
    return isEmpty((differenceWith(x, y, isEqual)))
  }

  isEmptyObject(obj: any) {
    return Object.keys(obj).length === 0;
  }
  ////  addToPlanData

  // addToPlanDataOld() {
  //   this.checkPriceData();
  //   if (this.isDisabledAddToPlanButton) {
  //     return;
  //   }

  //   let data: any[] = [];
  //   let item = this.localstorageService.getItem(LOCAL_STORAGE.addtoplan);
  //   data = (item != null) ? JSON.parse(item) : [];

  //   let selectedUid = this.shoppingCartData[0].uid;

  //   let index = findIndex(data, ['uid', selectedUid]);
  //   if (index >= 0) {
  //     data[index] = this.shoppingCartData[0];
  //   }
  //   else {
  //     data.push(this.shoppingCartData[0]);
  //   }

  //   this.localstorageService.setItem(LOCAL_STORAGE.addtoplan, JSON.stringify(data));

  //   this.shoppingCartService.updateShoppingCartData();

  //   if (this.isEditShoppingCart == true) {
  //     this.commonService.openSnackBar('This Product has been updated.');
  //   }
  //   else {
  //     this.commonService.openSnackBar('This Product has been added to your Shopping Cart.');
  //   }
  //   this.dialogRef.close(true);
  // }


  addToPlanData() {

    let campaignData: any = {};
    campaignData.item = this.shoppingCartData[0];
    campaignData.item.selected_currency = this.selectedCurrency;
    
    let serviceData: any = [];
    serviceData['formData'] = campaignData;

    this.shoppingCartService.shoppingCartCreate(serviceData).subscribe(result => {
      if (result.status == true) {
       
        this.shoppingCartService.updateShoppingCartData();

        if (this.isEditShoppingCart == true) {
          this.commonService.openSnackBar('This Product has been updated.');
        }
        else {
          this.commonService.openSnackBar('This Product has been added to your Shopping Cart.');
        }
        this.dialogRef.close(true);
      }
    });

  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  // On Destroy
  ngOnDestroy(): void {
    this.shoppingCartObs.unsubscribe();
  }

}
