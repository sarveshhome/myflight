import { Component, OnInit, EventEmitter, Output, ElementRef, ViewEncapsulation } from '@angular/core';
import { BookingInformation } from '../../models/booking-info';
import { SearchResponse } from '../../models/search-response';
import { Flights } from '../../models/flights';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SearchService } from '../../services/search.service';

import 'rxjs/add/operator/take';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Airline } from 'src/app/models/airline';
import { CabinClass } from 'src/app/models/cabinclass';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchFlightsComponent implements OnInit {
  selectedAirline: Airline = new Airline(0, "All", 'All');
  myControl = new FormControl();
  DestinationControl = new FormControl();
  options: any[] = [];
  filteredOptions: Observable<string[]>;
  filteredDestinationOptions: Observable<string[]>;
  searchForm: FormGroup;
  searchTo: FormGroup;
  refineSearch = new FormControl();
  isFormValid: boolean = false;
  filteredOriginCities: string[] = [];
  filteredDestinationCities: string[] = [];
  totalCitiesListedOnServer: string[] = [];
  search: BookingInformation;
  submitted = false;
  ServiceValue = [];
  DestinationValue = [];
  airlines: Airline[];
  airlineId: string;
  cabinclasses: CabinClass[];
  constructor(private find: SearchService, private elementRef: ElementRef, private fb: FormBuilder, private _dataService: SearchService) {

    this.search = {
      departureDate: '',
      destinationCity: '',
      originCity: '',
      oneway: true,
      passengers: 0,
      refine: 1000
    };
    this.airlines = this._dataService.getAirlines();
    this.cabinclasses = this._dataService.gerCabinClasses();
  }
  ngOnInit() {
    /*source*/
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.filteredDestinationOptions = this.DestinationControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterDestination(value))
      );

    this.searchForm = new FormGroup({
      firstName: new FormControl()
    });
    this.searchTo = new FormGroup({
      DestName: new FormControl()
    });
  }
  onSelect(airlineId) {
    this.airlineId = airlineId;
  }
  private _filter(value: string): string[] {
    if (value.length >= 3) {
      const filterValue = value.toLowerCase();
      let data = {
        Name: filterValue
      }
      this.find.getOriginOnFlight(data).subscribe(res => {
        if (res) {
          this.ServiceValue = res;
          console.log(this.ServiceValue);
        }
      },
        err => {
          console.log(err);
        }
      );
      return this.ServiceValue;
    }
  }
  private _filterDestination(value: string): string[] {
    if (value.length >= 3) {
      const DestfilterValue = value.toLowerCase();
      const Destdata = {
        Name: DestfilterValue
      }
      this.find.getDestinationOnFlight(Destdata).subscribe(res => {
        if (res) {
          this.DestinationValue = res;
          console.log(this.DestinationValue);
        }
      },
        err => {
          console.log(err);
        }
      );
      return this.DestinationValue;
    }
  }
  /**
   * Selected value from list //return this.options.filter(option => option.toLowerCase().includes(filterValue));
   * @param city
   */

  public onSubmit(): void {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return
    }
    else
      // convert to lowercase
      // this.search.destinationCity = this.searchForm..destinationCity.toLowerCase();
      // this.search.originCity = this.searchForm.originCity.toLowerCase();
      console.log("f is", this.searchForm);



  }
  dateClass = (d: Date) => {
    const date = d.getDate();

    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'example-custom-date-class' : undefined;
  }
}
