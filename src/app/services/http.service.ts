import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, debounceTime } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public API_URL = environment.apiUrl;
	public isMasterMockTrue = environment.isMasterMockTrue;

	public httpOptions;
	constructor(
		private http: HttpClient,private router:Router
	) {
		this.setHeaders();
	}
	private setHeaders(contentType?) {
		const userInfo = localStorage.getItem("userInfo") != null ? JSON.parse(localStorage.getItem("userInfo")) : { "token": "", "userId": null, "roleId": null };
		this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': contentType || 'application/json',
				'Authorization': 'bearer ' + userInfo.token
			})
		};
	}
	public getApi(url: string, mockFileName?: string, isMockTrue: boolean = false) {
		if (this.httpOptions !== null)
			this.setHeaders();
		if (this.isMasterMockTrue || isMockTrue) {
			return this.http.get(`assets/mockJSON/get/${mockFileName}.json`);
		} else {
			return this.http.get(this.API_URL + url, this.httpOptions)
				.pipe(
					map(response => response),
					catchError(this.handleError<any>())
				);
		}
	}
	public postApi(url: string, options, contentType?, mockFileName?: string, isMockTrue: boolean = false) {
		if (this.httpOptions !== null){
			this.setHeaders();
		}
		if(contentType){
			this.setHeaders(contentType);
		}
		if (this.isMasterMockTrue || isMockTrue) {
			return this.http.get(`assets/mockJSON/get/${mockFileName}.json`);
		} else {
			let requestParams = {};
			requestParams = options;
			return this.http.post(this.API_URL + url, requestParams, this.httpOptions)
				.pipe(
					map(response => response),
					catchError(this.handleError<any>())
				);
		}
	}

	public putApi(url: string, options, mockFileName: string, isMockTrue: boolean = false) {
		if (this.isMasterMockTrue || isMockTrue) {
			return this.http.get(`assets/mockJSON/get/${mockFileName}.json`);
		} else {
			let requestParams = {};
			requestParams = options;
			return this.http.put(this.API_URL + url, requestParams, this.httpOptions).pipe(
				map(response => response),
				catchError(this.handleError<any>('updateHero'))
			);
		}
	}
	public postApiThird(url: string, options, contentType?, mockFileName?: string, isMockTrue: boolean = false) {
		if (this.httpOptions !== null){
			this.setHeaders1();
		}
		if(contentType){
			this.setHeaders1(contentType);
		}
		if (this.isMasterMockTrue || isMockTrue) {
			return this.http.get(`assets/mockJSON/get/${mockFileName}.json`);
		} else {
			let requestParams = {};
			requestParams = options;
			return this.http.post(url, requestParams, this.httpOptions)
				.pipe(
					map(response => response),
					catchError(this.handleError<any>())
				);
		}
	}
	private setHeaders1(contentType?) {
		this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': contentType || 'application/json'
			})
		};
	}


	public handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			if (error.status === 401){
				localStorage.removeItem("userInfo");
				this.router.navigate(['/login']);
			}
			throw error;
		};
	}
	public deleteApi(url: string, mockFileName?: string, isMockTrue: boolean = false) {
		if (this.httpOptions !== null)
			this.setHeaders();
		if (this.isMasterMockTrue || isMockTrue) {
			return this.http.get(`assets/mockJSON/get/${mockFileName}.json`);
		} else {
			return this.http.delete(this.API_URL + url, this.httpOptions)
				.pipe(
					map(response => response),
					catchError(this.handleError<any>())
				);
		}
	}
}
