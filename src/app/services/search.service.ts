import { Injectable } from '@angular/core';
import { Flights } from '../models/flights';
import { BookingInformation } from '../models/booking-info';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { tap } from 'rxjs/operators/tap';
import { Airline } from '../models/airline';
import { CabinClass } from '../models/cabinclass';
import { environment } from 'src/environments/environment.prod';

//const apiUrl = `./assets/data/flight-data.json`;
const apifightUrl = environment.apiUrl;// 'http://travelservice.geetainfotech.com/api';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public httpOptions;
  constructor(private http: HttpClient) { }

  public getOriginOnFlight(sourcestr): Observable<any> {
    if (this.httpOptions !== null) {
      this.setHeaders();
    }
    return this.http.post(apifightUrl + '/Mydata', sourcestr, this.httpOptions)
      .pipe(
        map(response => response),
        catchError(this.handleError<any>())
      );

  }
  public getDestinationOnFlight(destinationstr): Observable<any> {
    if (this.httpOptions !== null) {
      this.setHeaders();
    }
    return this.http.post(apifightUrl + "/GetDestination", destinationstr, this.httpOptions)
      .pipe(
        map(response => response),
        catchError(this.handleError<any>())
      );

  }
  public getAirlines() {
    return [
      new Airline(1, 'EI', 'Aer Lingus'),
      new Airline(2, 'AR', 'Aerolineas Argentinas'),
      new Airline(3, 'AB', 'Air Berlin'),
      new Airline(4, 'AC', 'Air Canada'),
      new Airline(5, 'CA', 'Air China'),
      new Airline(6, 'UX', 'Air Europa Lineas Aereas'),
      new Airline(7, 'AF', 'Air France'),
      new Airline(8, 'AI', 'Air India'),
      new Airline(9, 'JM', 'Air Jamaica'),
      new Airline(10, 'KM', 'Air Malta'),
      new Airline(11, 'MK', 'Air Mauritius'),
      new Airline(12, 'SW', 'Air Namibia'),
      new Airline(13, 'NZ', 'Air New Zealand'),
      new Airline(14, 'HM', 'Air Seychelles'),
      new Airline(15, 'AZ', 'Alitalia'),
      new Airline(16, 'AA', 'American Airlines'),
      new Airline(17, 'NH', 'ANA'),
      new Airline(18, 'OZ', 'Asiana Airlines'),
      new Airline(19, 'OS', 'Austrian Airlines'),
      new Airline(20, 'BA', 'British Airways'),
      new Airline(1, 'SN', 'Brussels Airlines'),
      new Airline(1, 'BW', 'Caribbean Airlines'),
      new Airline(1, 'CX', 'Cathay Pacific Airways'),
      new Airline(1, 'CI', 'China Airlines'),
      new Airline(1, 'MU', 'China Eastern Airlines'),
      new Airline(1, 'CZ', 'China Southern'),
      new Airline(1, 'CO', 'Continental Airlines'),
      new Airline(1, 'CY', 'Cyprus Airways'),
      new Airline(1, 'OK', 'Czech Airlines'),
      new Airline(1, 'DL', 'Delta Airlines'),
      new Airline(1, 'MS', 'Egypt Air'),
      new Airline(1, 'EK', 'Emirates Airways'),
      new Airline(1, 'OV', 'Estonian Air'),
      new Airline(1, 'ET', 'Ethiopian Airlines'),
      new Airline(1, 'EY', 'Etihad Airways'),
      new Airline(1, 'BR', 'EVA Air'),
      new Airline(1, 'AY', 'Finnair'),
      new Airline(1, 'BE', 'FlyBe'),
      new Airline(1, 'GA', 'Garuda Indonesia'),
      new Airline(1, 'GF', 'Gulf Air'),
      new Airline(1, 'IB', 'Iberia Airlines '),
      new Airline(1, 'FI', 'IcelandAir'),
      new Airline(1, 'JL', 'Japan Airlines'),
      new Airline(1, '9W', 'Jet Airways'),
      new Airline(1, 'KL', 'KLM Royal Dutch Airlines'),
      new Airline(1, 'KE', 'Korean Air'),
      new Airline(1, 'KU', 'Kuwait Airways'),
      new Airline(1, 'LA', 'LAN Airlines'),
      new Airline(1, 'LO', 'LOT Polish Airlines'),
      new Airline(1, 'LH', 'Lufthansa'),
      new Airline(1, 'MH', 'Malaysia Airlines'),
      new Airline(1, 'ZB', 'Monarch Airlines'),
      new Airline(1, 'NW', 'Northwest Airlines'),
      new Airline(1, 'OA', 'Olympic Airlines'),
      new Airline(1, 'WY', 'Oman Air'),
      new Airline(1, 'QF', 'Qantas Airways'),
      new Airline(1, 'QR', 'Qatar Airways'),
      new Airline(1, 'AT', 'Royal Air Maroc'),
      new Airline(1, 'BI', 'Royal Brunei Airlines'),
      new Airline(1, 'RJ', 'Royal Jordanian'),
      new Airline(1, 'SK', 'SAS - Scandinavian Airlines'),
      new Airline(1, 'SQ', 'Singapore Airlines'),
      new Airline(1, 'SA', 'South African Airways'),
      new Airline(1, 'UL', 'SriLankan Airlines'),
      new Airline(1, 'LX', 'Swiss Airlines'),
      new Airline(1, 'JJ', 'TAM Airlines'),
      new Airline(1, 'TP', 'TAP Portugal'),
      new Airline(1, 'TG', 'Thai Airways'),
      new Airline(1, 'TK', 'Turkish Airlines'),
      new Airline(1, 'PS', 'Ukraine Intl.'),
      new Airline(1, 'UA', 'United Airlines'),
      new Airline(1, 'US', 'US Airways'),
      new Airline(1, 'HY', 'Uzbekistan Airways'),
      new Airline(1, 'RG', 'Varig Brazilian'),
      new Airline(1, 'VN', 'Vietnam Airlines'),
      new Airline(1, 'VS', 'Virgin Atlantic'),
      new Airline(1, 'VG', 'VLM Airlines'),
      new Airline(1, 'WS', 'WestJet'),
      new Airline(1, 'FZ', 'Flydubai'),
      new Airline(1, 'PG', 'Bangkok Airways'),
      new Airline(1, 'HU', 'Hainan Airlines'),
      new Airline(1, 'GS', 'Tianjin Airlines')
    ];
  }
  public gerCabinClasses(){
    return [
      new CabinClass('any', 'Any'),
      new CabinClass('M', 'Economy'),
      new CabinClass('C', 'Business'),
      new CabinClass('F', 'First Class'),
      new CabinClass('W', 'Premium Economy')
    ]
  }


  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status === 401) {

      }
      throw error;
    };
  }
  private setHeaders(contentType?) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': contentType || 'application/json'
      })
    };
  }

}
