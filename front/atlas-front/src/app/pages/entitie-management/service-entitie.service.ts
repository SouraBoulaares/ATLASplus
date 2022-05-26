import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceEntitie } from '../../shared/model/data/ServiceEntitie.model';

import { UtilsServiceService } from '../../utils-service.service';
@Injectable({
  providedIn: 'root'
})
export class ServiceEntitieService {
  public API_ServiceEntitie = UtilsServiceService.REMOTE_ADDRESS + "/api/serviceEntitie";
  

  constructor(private httpClient: HttpClient) { }
 saveServiceEntitie(serviceEntitie,entitieId): Observable<any> {
    
    return this.httpClient.post(this.API_ServiceEntitie+"/by-entitie/"+entitieId,serviceEntitie);
  }
  deleteServiceEntitie(id:number) :Observable<any> {
    
    return this.httpClient.delete(this.API_ServiceEntitie+"/delete/"+id);
  }
}
