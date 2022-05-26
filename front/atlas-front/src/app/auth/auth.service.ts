import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginRequest} from '../shared/model/data/LoginRequest.model';
import {UtilsServiceService} from '../utils-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public API_AUTH = UtilsServiceService.REMOTE_ADDRESS + "/api/xauth"

  constructor(private httpClient: HttpClient) {
  }

  signIn(payload: any): Observable<any> {
    return this.httpClient.post<any>(`${this.API_AUTH}/signin`, payload);
  }

}
