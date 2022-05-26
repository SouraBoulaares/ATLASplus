import { Injectable } from '@angular/core';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DatePipe} from '@angular/common';
import {environment} from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UtilsServiceService {
  //public static REMOTE_ADDRES = 'http://localhost:8099';
  // public static REMOTE_ADDRESS = 'http://212.129.37.67:8090/';
  public static REMOTE_ADDRESS = environment.baseApiUrl;
   public static LOCAL_FRONT_ADDRESS = environment.baseFrontEndUrl;
  // public static REMOTE_ADDRESS = 'http://142.93.96.4:8099/';
    public static API_FILE = UtilsServiceService.REMOTE_ADDRESS + '/api/files';
  public static API_AUTH = UtilsServiceService.REMOTE_ADDRESS + '/api/auth/signin';
  header = new HttpHeaders();

  constructor(private toastrService: NbToastrService, private httpClient: HttpClient,
              private datePipe: DatePipe) {

  }
  public getStates(): Observable<any> {

    return this.httpClient.get("assets/StateCountry.json");
  }
  public showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? `${title}` : '';
    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }

  public post(url: string, object: any): Observable<any> {

    return this.httpClient.post(url, object);
  }

  public post_promise(url: string, object: any): Promise<any> {

    return this.httpClient.post(url, object).toPromise();
  }

  public put(url: string, object: any): Observable<any> {

    return this.httpClient.put(url, object);
  }

  public get(url: string): Observable<any> {

    return this.httpClient.get(url);
  }
  public getWithParams(url: string,params:any): Observable<any> {

    return this.httpClient.get(url,params);
  }
  public delete(url: string): Observable<any> {

    return this.httpClient.delete(url);
  }

  now(format: string): string {

    return this.datePipe.transform(new Date().toLocaleDateString('en-US', { timeZone: 'Africa/Tunis' }) +
      ' ' + new Date().toLocaleTimeString('en-US', { timeZone: 'Africa/Tunis' }), format, 'Africa/Tunis');

  }

  getDate(date: any, format: string): string {
    return this.datePipe.transform(date, format, 'Africa/Tunis');
  }

  convertAmountToString(initialAmount: string) : string {
    let amount = '';
    if(initialAmount.includes('.')) {
      const array: any[] = initialAmount.split('.');
      if(array[1].length ===1) {
        array[1] = "." + array[1] + "00";
        return array[0] + array[1];
      } else if(array[1].length === 2) {
        array[1] = "." + array[1] + "0";
        return array[0] + array[1];
      }else if(array[1].length > 3){
        return array[0] + "." + array[1].substring(0,3);
      }
      return array[0] + '.' + array[1];
    }
    else {
      amount = initialAmount + '.000';
      return amount;
    }

  }
  convertAmountToStringWithSeperator(initialAmount: string) : string {
    let amount = '';
    if(initialAmount.includes('.')) {
      const array: any[] = initialAmount.split('.');
      if(array[1].length ===1) {
        array[1] = "." + array[1] + "00";
        return this.addSpaceInString(array[0]) + array[1];
      } else if(array[1].length === 2) {
        array[1] = "." + array[1] + "0";
        return this.addSpaceInString(array[0]) + array[1];
      }else if(array[1].length > 3){
        return this.addSpaceInString(array[0]) + "." + array[1].substring(0,3);
      }
      return this.addSpaceInString(array[0])+ '.' + array[1];
    }
    else {
      amount = this.addSpaceInString(initialAmount) + '.000';
      return amount;
    }

  }
  addSpaceInString(initialAmount:any):string
  {
    return initialAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }


}

