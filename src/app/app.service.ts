import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = 'http://dummy.restapiexample.com/api/v1/';
  private authToken = '12345'

  constructor(private http: HttpClient) { }

  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err.message);
  }

  public login(data):boolean {
    if(data.email == 'abc@xyz.com' && data.password=='abcd'){
      this.setUserInfoInLocalStorage({authToken:this.authToken});
      return true;
    }else{
      return false;
    }
  }

  public getEmployee(data): Observable<any> {
     if(this.getUserInfoFromLocalStorage().authToken !=this.authToken){
       return null;
     }else
     return this.http.get(`${this.url}employee/${data.id}`, { });
  }

  public getEmployees(): Observable<any> {
    if(this.getUserInfoFromLocalStorage().authToken !=this.authToken){
      return null;
    }else
    return this.http.get(`${this.url}employees`, { });
  }

  public getUserInfoFromLocalStorage() {
    if (localStorage.getItem('userInfo')) {
      return JSON.parse(localStorage.getItem('userInfo'));
    } else {
      return null;
    }
  }

  public setUserInfoInLocalStorage(data) {
    return localStorage.setItem('userInfo', JSON.stringify(data));
  }

}
