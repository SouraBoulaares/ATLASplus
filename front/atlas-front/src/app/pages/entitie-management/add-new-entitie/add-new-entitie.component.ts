
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { UtilsServiceService } from '../../../utils-service.service';
import { EntitieService } from '../entitie.service';

@Component({
  selector: 'ngx-add-new-entitie',
  templateUrl: './add-new-entitie.component.html',
  styleUrls: ['./add-new-entitie.component.scss']
})
export class AddNewEntitieComponent implements OnInit {
  @Input() showEntitieWindow=false;
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
 
  @Output() cancelEvent = new EventEmitter();
  @Output() saveEntitieEvent = new EventEmitter();
  constructor(
   
    private entitieService: EntitieService,
    public dialogService: DialogService,
    private utilsService: UtilsServiceService
  ) {}

  ngOnInit(): void {
   
  }

  saveEntitie() {
    this.entitie.entitieDescription = JSON.stringify(this.entitie.entitieDescription );
    this.entitieService.saveEntitie(this.entitie).subscribe(
      (response) => {
        console.log("la valeur de entitie enregistrée", response);
        this.saveEntitieEvent.emit();
        this.utilsService.showToast('success',
        'Entite ajoutée avec succés',
        `L'entite   ${this.entitie.entitieName} a été ajoutée avec succcés`);
  
        },
      (error) => {
        this.utilsService.showToast('danger',
        `Erreur interne`,
        `Une erreur interne s'est produite lors du sauvgarde de l'entitie'.`);
    }
    );
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
}
