import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Services } from '../../../shared/model/data/Services.model';
import { UtilsServiceService } from '../../../utils-service.service';
import { ServiceService } from '../service.service';
import { isUndefined } from 'lodash';
import { ServiceEntitie } from '../../../shared/model/data/ServiceEntitie.model';
@Component({
  selector: 'ngx-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
  listServices: ServiceEntitie[] = [];
  service: ServiceEntitie = new ServiceEntitie();
  displayDeleteService:boolean=false;
  serviceSelected:ServiceEntitie;
  constructor(private router: Router, private serviceManagementService: ServiceService, private utilsService: UtilsServiceService) { }

  ngOnInit(): void {
    this.getAllServices();
  }
  getAllServices() {
    this.serviceManagementService.getAllServices().subscribe((services: ServiceEntitie[]) => {
      this.listServices = services;
    }, (error) => {
      this.utilsService.showToast('danger',
        `Erreur interne`,
        `Une erreur interne s'est produite lors du chargement de la liste des configurations.`);
    })
  }
  checkServiceValid():boolean
  {
    return this.service.serviceName == null || this.service.serviceName == ""
  }

  saveService()
  {
    if(isUndefined(this.service.serviceIsConfigurable)){
      this.service.serviceIsConfigurable=false;
    }
    this.serviceManagementService.saveService(this.service).subscribe((result: any) => {
      this.getAllServices();
      this.service= new ServiceEntitie();
      this.utilsService.showToast(
        'success',
        'configuration ajoutée',
        `La configuration du service a été ajoutée avec succée`
      );
    }, (error) => {
      this.utilsService.showToast(
        'danger',
        'Erreur interne',
        `Un erreur interne a été produit lors d'enregistrement du configuration`
      );
    })
  }
  editService(service)
  {
    this.serviceManagementService.saveService(service).subscribe((result: any) => {
      this.getAllServices();
      this.utilsService.showToast(
        'success',
        'configuration modifiée',
        `La configuration du service a été modifiée avec succées`
      );
    }, (error) => {
      this.utilsService.showToast(
        'danger',
        'Erreur interne',
        `Un erreur interne a été produit lors du modification du configuration`
      );
    })
  }
  deleteService(service)
  {
    this.serviceSelected=service;
    this.displayDeleteService=true;
  }
  delService()
  {
    this.serviceManagementService.deleteService(this.serviceSelected.serviceId).subscribe((result: any) => {
      this.getAllServices();
      this.displayDeleteService=false;
      this.utilsService.showToast(
        'success',
        'Configuration supprimée',
        `La configuration a été supprimé avec succée`
      );
    }, (error) => {
      this.utilsService.showToast(
        'danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de suppression du configuration`
      );
    }
    )
  }
}
