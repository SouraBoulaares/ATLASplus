import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceEntitie } from '../../shared/model/data/ServiceEntitie.model';
import { Services } from '../../shared/model/data/Services.model';

import { UtilsServiceService } from '../../utils-service.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
 public API_SERVICE = UtilsServiceService.REMOTE_ADDRESS + "/api/serviceEntitie"

  constructor(private httpClient: HttpClient) { }
  getAllServices(): Observable<ServiceEntitie[]> {
    
    return this.httpClient.get<ServiceEntitie[]>(this.API_SERVICE);
  }
  saveService(service:ServiceEntitie): Observable<any> {
    
    return this.httpClient.post(this.API_SERVICE,service);
  }
  deleteService(id:number) :Observable<any> {
    
    return this.httpClient.delete(this.API_SERVICE+"/delete/"+id);
  }


}
