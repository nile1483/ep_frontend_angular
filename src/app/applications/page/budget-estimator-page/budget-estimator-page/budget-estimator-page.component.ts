
import { Component, AfterViewInit, Inject, ElementRef, ViewChild, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { C2A_TITLE_DATA, META_DATA } from '@app-shared-constants';
import { PLATFORM_ID } from '@angular/core';
import { AppURL } from 'src/app/app-url';
import { MetaInformation } from '@app-shared-model';
import { Router } from 'express';
import { CommonService, UserService } from '@app-shared-services';
import { PageService } from '../../page.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Utilities } from '@app-shared-helpers';
import { LocationParm } from '@app-media-models';

declare var Chart: any;

@Component({
  selector: 'app-budget-estimator-page',
  templateUrl: './budget-estimator-page.component.html',
  styleUrls: ['./budget-estimator-page.component.css']
})
export class BudgetEstimatorPageComponent implements AfterViewInit {


  metaData: any = META_DATA['budgetestimator'];
  callToActionData: CallToAction = { title: C2A_TITLE_DATA['budgetestimator'], inquiryUser: {} };
  webURL: string = AppURL.webURL;

  ngOnInit(): void {
    this.setMetaData();
    this.getBudgetEstimatorPlanData();
  }

  getBudgetEstimatorPlanData() {
    this.pageService.getBudgetEstimator('budgetplans').subscribe(result => {
      if (result.status == true) {
        this.callToActionData.inquiryUser = result.data?.inquiryUser;
        this.baseBudgets = result.data?.budgets;
        this.generateBudgetCombinations();
      }
    });
  }


  setMetaData() {
    let metaInfo = new MetaInformation();
    metaInfo.meta_title = this.metaData?.meta_title ?? '';
    metaInfo.meta_description = this.metaData?.meta_description ?? '';
    metaInfo.meta_keywords = this.metaData?.meta_keywords ?? '';
    //og data          
    metaInfo.og_url = `${this.webURL}`;
    metaInfo.og_image = `${this.webURL}` + '/assets/logo/excellent-logo-footer.webp';

    this.commonService.setMetaData(metaInfo);

    //************************// 
    //   Google Tag Manager   //
    //************************//

    this.commonService.gtmPageEvents('Company', 'Company');
  }


  // Configuration arrays
  verticals = ['All', 'Airport', 'BTL', 'Cinema', 'Digital', 'Digital PR', 'Influencer', 'Magazine', 'Newspaper', 'Outdoor', 'Radio', 'Television'];

  sliderConfigs = [
    {
      key: 'brandStage', label: 'Brand Stage', minLabel: 'Emerging', maxLabel: 'Established',
      formatter: (v: number) => ['New', '1 Year', '2-5 Years', '6-8 Years', '9-10 Years', 'Established'][v]
    },
    {
      key: 'campaignObjective', label: 'Campaign Objective', minLabel: 'Explore', maxLabel: 'Drive Sales',
      formatter: (v: number) => ['New', 'Awareness', 'Traffic', 'Engagement', 'Leads', 'Sales'][v]
    },
    {
      key: 'reach', label: 'Reach', minLabel: 'Hyperlocal', maxLabel: 'Pan India',
      formatter: (v: number) => ['Hyperlocal', 'Single City', 'Multi City', 'State', 'Cluster', 'Pan India'][v]
    }
  ];

  // State
  selectedCities: string[] = [];
  selectedVertical: string[] = [];
  sliders = { brandStage: 0, campaignObjective: 0, reach: 0 };
  pilot = 200000; cruise = 300000; accelerate = 600000;
  chart: any;
  suggestedBudget = 0;

  baseBudgets: any = {};

  // // Base budget data (compressed)
  // private baseBudgets = {
  //   'Ahmedabad': { 'Airport': [634250, 951375, 1902750], 'Radio': [50000, 342658, 708944], 'Outdoor': [100000, 224332, 448664], 'Cinema': [100000, 224332, 448664] },
  //   'Surat': { 'Airport': [500000, 750000, 1500000], 'Radio': [50000, 75000, 150000], 'Outdoor': [100000, 182900, 365800], 'Cinema': [100000, 182900, 365800] },
  //   'Rajkot': { 'Airport': [500000, 750000, 1500000], 'Radio': [50000, 75000, 150000], 'Outdoor': [100000, 150000, 300000], 'Cinema': [100000, 150000, 300000] }
  // };

  budgetData: { [key: string]: number[] } = {};

  // location
  isFound: boolean = false;
  locationMessage: string = '';
  selectedLocation: any[] = [];
  locationSearchControl = new UntypedFormControl();
  locationSearchResults: any[] = [];
  @ViewChild('locationInput') locationInput !: ElementRef<HTMLInputElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private commonService: CommonService,
    private pageService: PageService,
  ) {

    this.filteredVerticals = this.verticalCtrl.valueChanges.pipe(
      startWith(null),
      map((vertical: string | null) => (vertical ? this._filter(vertical) : this.allVerticals.slice())),
    );

    // set location Search Control subscription
    this.locationSearchControl.valueChanges.subscribe(newValue => {
      if (newValue != null) {
        this.geographyDataSearch(newValue);
      } else {
        this.locationSearchControl.setValue('');
      }
    });

  }

  private generateBudgetCombinations() {
      this.budgetData = {}; // reset before regenerating

  if (!this.selectedCities || this.selectedCities.length === 0) return;

    // Generate all city combinations (max 2 as per your rule)
    const getCityCombos = <T>(arr: T[], max: number): T[][] => {
      const result: T[][] = [];
      const backtrack = (start: number, combo: T[]) => {
        if (combo.length > 0 && combo.length <= max) result.push([...combo]);
        for (let i = start; i < arr.length; i++) {
          combo.push(arr[i]);
          backtrack(i + 1, combo);
          combo.pop();
        }
      };
      backtrack(0, []);
      return result;
    };

    const cityCombos = getCityCombos(this.selectedCities, 2);

    cityCombos.forEach(cityCombo => {
      const cityKey = [...cityCombo].sort().join(',');

      // ✅ iterate all subsets of verticals (excluding "All")
      const verticals = this.verticals.filter(v => v !== 'All');
      const verticalSubsets = (function getSubsets(arr: string[]): string[][] {
        const result: string[][] = [];
        const backtrack = (start: number, combo: string[]) => {
          if (combo.length > 0) result.push([...combo]);
          for (let i = start; i < arr.length; i++) {
            combo.push(arr[i]);
            backtrack(i + 1, combo);
            combo.pop();
          }
        };
        backtrack(0, []);
        return result;
      })(verticals);

      verticalSubsets.forEach(verticalCombo => {
        const verticalKey = verticalCombo.sort().join(' + ');
        const key = `${cityKey}|${verticalKey}`;
        const budget = [0, 0, 0];

        cityCombo.forEach(city => {
          verticalCombo.forEach(vertical => {
            const base = this.baseBudgets[city as keyof typeof this.baseBudgets][vertical as keyof typeof this.baseBudgets[keyof typeof this.baseBudgets]];
            budget[0] += base[0];
            budget[1] += base[1];
            budget[2] += base[2];
          });
        });

        this.budgetData[key] = budget;
      });

      // ✅ special case: "All"
      const allKey = `${cityKey}|All`;
      const allBudget = [0, 0, 0];
      cityCombo.forEach(city => {
        verticals.forEach(vertical => {
          const base = this.baseBudgets[city as keyof typeof this.baseBudgets][vertical as keyof typeof this.baseBudgets[keyof typeof this.baseBudgets]];
          allBudget[0] += base[0];
          allBudget[1] += base[1];
          allBudget[2] += base[2];
        });
      });
      this.budgetData[allKey] = allBudget;
    });
  }


  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.loadChartJs().then(() => this.initChart());
  }

  private loadChartJs(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).Chart) return resolve();
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }

  private initChart() {
    const ctx = document.getElementById('budgetChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      data: {
        labels: ['Pilot', 'Cruise', 'Accelerate'],
        datasets: [
          {
            label: 'Budget', data: [this.pilot, this.cruise, this.accelerate], type: 'bar',
            backgroundColor: ['#d32f2f', '#d32f2f', '#d32f2f'], xAxisID: 'xCategories', order: 2
          },
          {
            label: 'Line', data: [], type: 'line', borderColor: '#d32f2f', borderWidth: 2,
            fill: false, pointRadius: 0, tension: 0, xAxisID: 'xLinear', order: 1
          },
          {
            label: 'Dot', data: [], type: 'scatter', pointBackgroundColor: 'white',
            pointBorderColor: '#d32f2f', pointBorderWidth: 2, pointRadius: 6, xAxisID: 'xLinear', order: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          xCategories: { type: 'category', labels: ['Pilot', 'Cruise', 'Accelerate'], offset: true, grid: { display: false } },
          xLinear: { type: 'linear', min: 0, max: 2, display: false },
          y: {
            max: 6000000, grid: { display: false },
            ticks: { callback: (v: any) => v >= 1000000 ? '₹' + (Number(v) / 1000000).toFixed(1) + 'M' : '₹' + Number(v) / 1000 + 'K' }
          }
        }
      }
    });
    this.updateBudget();
  }

  private isValidSelection(): boolean {
    const cities = this.selectedCities?.length || 0;
    const verticals = this.selectedVertical?.filter(v => v?.trim()).length || 0;

    if (cities === 0 || verticals === 0 || cities > 2) return false;
    if (this.selectedVertical?.includes('All') && verticals > 1) return false;
    return true; // ✅ allow any number of verticals except when "All" is mixed
  }


  updateBudget() {
    if (!this.chart) return;

    if (!this.isValidSelection()) {
      this.chart.data.datasets[0].data = [0, 0, 0];
      this.chart.data.datasets[0].backgroundColor = ['#fd5c5cff', '#fd5c5cff', '#fd5c5cff'];
      this.chart.data.datasets[1].data = [];
      this.chart.data.datasets[2].data = [];
      this.suggestedBudget = 0;
      this.chart.update();
      return;
    }

    // Get budget
    const cityKey = [...this.selectedCities].sort().join(',');
    const verticalKey = this.selectedVertical.includes('All') ? 'All' :
      [...this.selectedVertical].sort().join(' + ');
    const lookupKey = `${cityKey}|${verticalKey}`;

    const budget = this.budgetData[lookupKey] || [200000, 300000, 600000];
    [this.pilot, this.cruise, this.accelerate] = budget;

    // Calculate suggested budget
    const sum = Object.values(this.sliders).reduce((a, b) => a + b, 0);

    if (sum === 0) {
      this.suggestedBudget = this.pilot;
      this.chart.data.datasets[1].data = [];
      this.chart.data.datasets[2].data = [];
      this.chart.data.datasets[0].backgroundColor = ['#fd5c5cff', '#fd5c5cff', '#fd5c5cff'];
    } else {
      const fraction = sum / 15; // 3 sliders * 5 max each
      const startX = 0.2, endX = 1.5;
      const dotX = startX + fraction * (endX - startX);
      const dotY = this.pilot + fraction * (this.accelerate - this.pilot);

      this.chart.data.datasets[1].data = [{ x: startX, y: this.pilot }, { x: endX, y: this.accelerate }];
      this.chart.data.datasets[2].data = [{ x: dotX, y: dotY }];
      this.suggestedBudget = Math.round(dotY);

      // Highlight closest bar
      const colors = ['#fd5c5cff', '#fd5c5cff', '#fd5c5cff'];
      if (dotY >= this.accelerate) colors[2] = '#d32f2f';
      else if (dotY >= this.cruise) colors[1] = '#d32f2f';
      else colors[0] = '#d32f2f';
      this.chart.data.datasets[0].backgroundColor = colors;
    }

    this.chart.data.datasets[0].data = [this.pilot, this.cruise, this.accelerate];
    this.chart.options.scales.y.max = Math.ceil(Math.max(this.pilot, this.cruise, this.accelerate) * 1.2);
    this.chart.update();
  }

  faqList = [
    {
      "question": "How Can I Figure Out My Advertising Budget?",
      "answer": "Begin by determining your objectives, projecting expenses, and utilizing an advertising budget calculator to fund items based on predicted performance and ROI."
    },
    {
      "question": "Can I Trust the Accuracy of an Ad Budget Calculator?",
      "answer": "Yes, as long as you enter realistic figures and apply a well-conceived tool, most advertising budget calculators return valid, usable recommendations."
    },
    {
      "question": "How Do I Choose the Right Ad Budget Calculator for Me?",
      "answer": "Choose a calculator that shares your campaign objective, accommodates numerous channels, and offers resources such as ROAS and platform-based budget estimators."
    },
    {
      "question": "Do I Need Marketing Experience to Use One of These Tools?",
      "answer": "No, the majority of ad budget calculators are easy to use and suitable for beginners and professionals alike to make easy decisions."
    },
    {
      "question": "Is My Data Safe When I Use an Ad Budget Calculator?",
      "answer": "Legitimate ad budget calculators respect user privacy and encrypt your information to keep it safe and confidential."
    }
  ];


  verticalCtrl = new FormControl('');
  filteredVerticals !: Observable<string[]>;
  allVerticals: string[] = ['All', 'Airport', 'BTL', 'Cinema', 'Digital', 'Digital PR', 'Influencer', 'Magazine', 'Newspaper', 'Outdoor', 'Radio', 'Television'];

  @ViewChild('verticalInput') verticalInput !: ElementRef<HTMLInputElement>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allVerticals.filter(vertical => vertical.toLowerCase().includes(filterValue));
  }

  remove(vertical: string): void {
    const index = this.selectedVertical.indexOf(vertical);

    if (index >= 0) {
      this.selectedVertical.splice(index, 1);
    }

    this.updateBudget();
  }

  selected(event: MatAutocompleteSelectedEvent): void {

    const value = (event.option.viewValue || '').trim();
    if (!value) return; // empty avoid

    if (value.toLowerCase() === 'all') {
      this.selectedVertical = ['All'];
    } else {
      this.selectedVertical = this.selectedVertical.filter(vertical => vertical.toLowerCase() !== 'all');

      if (!this.selectedVertical.includes(value)) {
        this.selectedVertical.push(value);
      }
    }

    this.verticalInput.nativeElement.value = '';
    this.verticalCtrl.setValue(null);

    this.updateBudget();
  }



  geographyDataSearch(value: any) {
    this.locationSearchResults = [];
    this.locationMessage = '';
    this.isFound = false;

    if (value.length > 2 && this.selectedCities.length <= 1) {
      let serviceData: any = [];
      serviceData['param'] = new LocationParm({ q: value });

      this.pageService.searchLocation(serviceData).subscribe((result: any) => {
        if (result.status == true) {
          this.isFound = false;
          this.locationSearchResults = result.data;
        }
        else {
          this.isFound = true;
          this.locationMessage = result.message;
        }
      });
    }
  }


  selectedLocationOption(event: any): void {

    const value = event.option.value;

    if (!value) return; // empty avoid

    if (!this.selectedCities.includes(value.city)) {
      // Push object with both values
      this.selectedLocation.push({
        search_string: value.search_string, // UI display
        city: value.city               // remove mate
      });

      this.selectedCities.push(value.city);
    }

    this.locationInput.nativeElement.value = '';
    this.locationSearchControl.setValue(null);

    this.generateBudgetCombinations();
    this.updateBudget();
  }


  removeLocation(location: any): void {

    const index = this.selectedLocation.indexOf(location);
    if (index >= 0) {
      this.selectedLocation.splice(index, 1);
    }

    const indexCities = this.selectedCities.indexOf(location?.city);
    if (indexCities >= 0) {
      this.selectedCities.splice(indexCities, 1);
    }

    this.updateBudget();
  }

}