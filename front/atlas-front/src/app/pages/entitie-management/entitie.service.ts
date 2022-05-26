import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entitie } from '../../shared/model/data/Entitie.model';

import { UtilsServiceService } from '../../utils-service.service';
@Injectable({
  providedIn: 'root'
})
export class EntitieService {
  public API_Entitie = UtilsServiceService.REMOTE_ADDRESS + "/api/entitie"

  constructor(private httpClient: HttpClient) { }
  getAllEntities(): Observable<Entitie[]> {
    
    return this.httpClient.get<Entitie[]>(this.API_Entitie);
  }
  saveEntitie(entitie): Observable<any> {
    
    return this.httpClient.post(this.API_Entitie,entitie);
  }
  deleteEntitie(id:number) :Observable<any> {
    
    return this.httpClient.delete(this.API_Entitie+"/delete/"+id);
  }
  public postXml(url: string, object: any): Observable<any> {

    return this.httpClient.post(this.API_Entitie +url, object);
  }
}
