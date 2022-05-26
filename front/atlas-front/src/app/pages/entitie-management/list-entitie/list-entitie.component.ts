import { Component, OnInit } from '@angular/core';
import { UtilsServiceService } from '../../../utils-service.service';
import { DialogService } from 'primeng/dynamicdialog';
import { isUndefined } from 'lodash';
import { EntitieService } from '../entitie.service';
import { Entitie } from '../../../shared/model/data/Entitie.model';
import { ServiceEntitieService } from '../service-entitie.service';


@Component({
  selector: 'ngx-list-entitie',
  templateUrl: './list-entitie.component.html',
  styleUrls: ['./list-entitie.component.scss']
})
export class ListEntitieComponent implements OnInit {

  displayDeleteEntitieModal = false;
  displayDeleteServiceModal = false;
  displayaddEntitieModal = false;
  displayaddServiceModal = false;
  showEntitieWindow=false;
  showServiceWindow=false;
  displayImporterEntities=false;
  selectedEntities = [];
  entitie = {
    entitieId: null,
    id:null,
    entitieName: null,
    entitieOwner: null,
    entitieVendor: null,
    entitieCategory: null,
    entitieType: null,
    entitieDescription: null
  };
  serviceEntitie = {
    serviceId: null,
    id:null,
    serviceName: null,
    serviceType: null,
    serviceDescription: null,
    keywords:[],
    inputs: [],
    serviceOutput:null,
    serviceIsConfigurable : null
  };
 
  loading = false;
   titleHeader: any;
  listentities : Entitie[];
  selectedFile: any = null;
  showImportButton = false;
  constructor(
    private entitieService: EntitieService,
    public dialogService: DialogService,
    private utilsService: UtilsServiceService,
    private serviceEntitieService: ServiceEntitieService,
   ) { }

  ngOnInit(): void {
    this.getAllEntites();
  }
  initEntitieId() {
    this.entitie = null;
  }
 



  getAllEntites() {
    const context = this;
    this.entitieService. getAllEntities().subscribe((entities: Entitie[]) => {
      for(let elt of entities) elt.entitieDescription = JSON.parse(elt.entitieDescription);
      this.listentities = entities;
      console.log(this.listentities);
    }, (error) => {
      this.utilsService.showToast('danger',
        `Erreur interne`,
        `Une erreur interne s'est produite lors du chargement de la liste des configurations.`);
    })
  
  }

  delEntitie(entitie) {
    console.log("entitie to delete");
    console.log(entitie);
    this.entitie = entitie;
    this.displayDeleteEntitieModal = true;
  }
  deleteEntitie() {

    const context = this;
    this.entitieService.deleteEntitie(this.entitie.entitieId).subscribe(response => {

      this.utilsService.showToast('success',
        'Entité supprimé avec succés',
        `L'entité ${this.entitie.entitieName} a été supprimé avec succés`);
      this.displayDeleteEntitieModal = false;
      context.getAllEntites();
      this.initEntitie();
    },
      error => {
        this.utilsService.showToast('danger',
          'Erreur interne',
          `Un erreur interne a été produit lors de la suppression du l'entité ${this.entitie.entitieName}`);
          this.displayDeleteEntitieModal = false;
          this.initEntitie();
      });



  }
  delService(service){
    console.log("service to delete");
    console.log(service);
    this.serviceEntitie = service;
    this.displayDeleteServiceModal = true;
  }
  deleteService(){
    const context = this;
   this.serviceEntitieService.deleteServiceEntitie(this.serviceEntitie.serviceId).subscribe(response => {

    this.utilsService.showToast('success',
      'Service supprimé avec succés',
      `Le service ${this.serviceEntitie.serviceName} a été supprimé avec succés`);
    this.displayDeleteServiceModal = false;
    context.getAllEntites();
    this.initEntitie();
  },
    error => {
      this.utilsService.showToast('danger',
        'Erreur interne',
        `Un erreur interne a été produit lors de la suppression du le service ${this.serviceEntitie.serviceName}`);
        this.displayDeleteServiceModal = false;
        this.initEntitie();
    });

  }
 

  initEntitie() {
    this. entitie = {
      entitieId: null,
      id:null,
      entitieName: null,
      entitieOwner: null,
      entitieVendor: null,
      entitieCategory: null,
      entitieType: null,
      entitieDescription: null
    };
  }

  cancelentitie(){
    this.initEntitie();
    this.getAllEntites();
    this.selectedEntities = [];
    
    this.displayaddEntitieModal=false;
    this.showEntitieWindow=false;
  }
cancelservice(){
this.initEntitie();
this.getAllEntites();
this.displayaddServiceModal=false;
this.showServiceWindow=false;
}
  
 
  AddEntity(){
    this.entitie = {
      entitieId: null,
     id:null,
      entitieName: null,
      entitieOwner: null,
      entitieVendor: null,
      entitieCategory: null,
      entitieType: null,
      entitieDescription: null
    };
    
    this.titleHeader = "Nouvelle entité";
      this.displayaddEntitieModal = true;
  
    
  }
  addservice(entitie){
    this.titleHeader = "Nouvelle service";
    this.entitie=entitie;
    this.displayaddServiceModal=true;
  }
  modifierEntitie(entitie){
    console.log(entitie)
this.entitie=entitie;
this.showEntitieWindow=true;
this.displayaddEntitieModal=true;
  }
  
  pairOrImpair(serviceId){
    return serviceId%2 == 0
  }
  ModifyService(service,entitie){
    this.entitie=entitie;
    this.serviceEntitie=service
this.displayaddServiceModal=true;
  }
  saveEntitieHandler(){
    this.getAllEntites();
    this.initEntitie();
    this.displayaddEntitieModal=false;
  }
  testValidation(entitie){
    if(!isUndefined(entitie.entitieDescription.content)){
    return  isUndefined(entitie.entitieDescription.content[0].content);
    }
  }

  saveServiceHandler(){
    this.getAllEntites();
    this.displayaddServiceModal=false;
  }
  showImportWindow(){
    this.displayImporterEntities=true;
  }
  closeImportWindow() {
    this.selectedFile = null;
    this.displayImporterEntities=false;
  }
  selectFile(event) {
    this.selectedFile = event.target.files[0];
    if(this.selectedFile != null) {
      this.showImportButton = true;
    }
  }
  importer() {
    const context = this;
    let formData = new FormData()
    formData.append('file', this.selectedFile)
    this.entitieService.postXml("/import", formData).subscribe(
      (response) => {
        // this.utilsService.showToast('success',
        //   "Document importé avec succès",
        //   `La liste des entities a été importé avec succès`);
        // //this.showClientWindow=false;
        this.displayImporterEntities=false;
       this.getAllEntites();
      }, (error) => {
        this.utilsService.showToast('danger',
          "Erreur interne",
          `Un erreur interne a été produit lors de l'import des entities. Veuillez verifier le format du fichier importé et verifiez bien qu'elle est compatible avec le format requis! `);
      })
  }
}
