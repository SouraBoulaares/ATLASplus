import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { UtilsServiceService } from '../../../utils-service.service';

import { isUndefined } from 'lodash';
import { ServiceEntitieService } from '../service-entitie.service';

@Component({
  selector: 'ngx-add-new-service',
  templateUrl: './add-new-service.component.html',
  styleUrls: ['./add-new-service.component.scss']
})
export class AddNewServiceComponent implements OnInit {
  @Input() showServiceWindow=false;
  @Input() entitie = {
    entitieId: null,
    id:null,
    entitieName: null,
    entitieOwner: null,
    entitieVendor: null,
    entitieCategory: null,
    entitieType: null,
    entitieDescription: null
  };
  @Input() serviceEntitie = {
    serviceId: null,
    id:null,
    serviceName: null,
    serviceType: null,
    serviceDescription: null,
    serviceCategory:null,
    keywords:[],
    inputs: [],
    serviceOutput: {
    outputId : null,
    outputLabel : null,
    outputType : null,
    outputDescription : null
    },
    serviceIsConfigurable : null
  };
 
  @Output() cancelEvent = new EventEmitter();
  @Output() saveServiceEntitieEvent = new EventEmitter();
  Keyword = {
    keywordId : null,
    keywordLabel : null
  }
  input = {
    inputId : null,
    id:null,
inputLabel : null,
inputType : null,
inputDescription : null

  }
 
  constructor(
   
    private serviceEntitieService: ServiceEntitieService,
    public dialogService: DialogService,
    private utilsService: UtilsServiceService
  ) {
    
    console.log(this.serviceEntitie);
  }

  ngOnInit(): void {
    console.log(this.serviceEntitie);
    if(this.serviceEntitie.serviceOutput==null) this.serviceEntitie.serviceOutput ={
      outputId : null,
      outputLabel : null,
      outputType : null,
      outputDescription : null
      }
  }

  saveServiceEntitie() {
    if(isUndefined(this.serviceEntitie.serviceIsConfigurable)){
      this.serviceEntitie.serviceIsConfigurable=false;
    }
    this.serviceEntitieService.saveServiceEntitie(this.serviceEntitie,this.entitie.entitieId).subscribe(
    (response) => {
      console.log("la valeur de Serviceentitie enregistrée", response);
      this.initEntitieService();
      this.saveServiceEntitieEvent.emit();
      this.utilsService.showToast('success',
      'Entite ajoutée avec succés',
      `Le service  ${this.serviceEntitie.serviceName} a été ajoutée avec succcés`);

      },
    (error) => {
      this.utilsService.showToast('danger',
      `Erreur interne`,
      `Une erreur interne s'est produite lors du sauvgarde de service'.`);
  }
  );
}
initEntitieService(){
  this.serviceEntitie = {
    serviceId: null,
    id:null,
    serviceName: null,
    serviceType: null,
    serviceDescription: null,
    serviceCategory : null,
    keywords:[],
    inputs: [],
    serviceOutput: {
    outputId : null,
    outputLabel : null,
    outputType : null,
    outputDescription : null
    },
    serviceIsConfigurable : null
  };
}
  cancel() {
    this.cancelEvent.emit();
  }
  checkentitieValid(): boolean {
    return (
      this.entitie.entitieName == "" ||
      this.entitie.entitieName === "" 
    );
  }
  checkKeywordValid():boolean
  {
    return this.Keyword.keywordLabel == null || this.Keyword.keywordLabel == ""
  }

  checkServiceEntitieValid(){
    return this.serviceEntitie.serviceName==null || this.serviceEntitie.serviceName==""
  }
  saveKeyword(){
this.serviceEntitie.keywords.push(this.Keyword);
this.initKeyword();

  }
 
  deleteKeyword(keyword){
    this.serviceEntitie.keywords.splice(this.serviceEntitie.keywords.indexOf(keyword,1));

  }
  checkInputValid(){
    return this.input.inputLabel == null || this.input.inputLabel == ""
  }
 
  saveInput(){
this.serviceEntitie.inputs.push(this.input);
this.initInput();
  }
  deleteInput(input){
    console.log(input);
    this.serviceEntitie.inputs.splice(this.serviceEntitie.inputs.indexOf(input,1));
  }


  initKeyword(){
    this.Keyword = {
      keywordId : null,
      keywordLabel : null
    }
   
   
  }
  initInput(){
    this.input = {
  inputId : null,
  id:null,
  inputLabel : null,
  inputType : null,
  inputDescription : null
  
    }
  }
  
}
