import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class SearchFlightsService {

  constructor(private httpService: HttpService) { }

  // getAllUsers(): Observable<User[]> {
  //   return this.httpService.getApi('/user')
  //   .pipe(
  //     tap(res => {
  //       if(res){
  //         //let token = res.token;
  //         return res;
  //       }

  //   })
  // );
  // }



}
