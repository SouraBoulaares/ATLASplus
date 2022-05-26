
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {MatTableModule} from '@angular/material';
import {UtilsServiceService} from '../../utils-service.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalModule} from 'ngx-bootstrap/modal';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import {DatePipe, registerLocaleData} from '@angular/common';
registerLocaleData(localeFr, 'fr', localeFrExtra);
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {PanelModule} from 'primeng/panel';

import {DialogModule} from 'primeng/dialog';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
//import { InterceptService } from '../../shared/interceptor/InterceptService.service';
import {FileUploadModule} from "primeng/fileupload";
import {TooltipModule} from "primeng/tooltip";

import {Ng2TelInputModule} from 'ng2-tel-input';
import { ServiceRoutingModule } from './service-routing.module';
import { ServicesListComponent } from './services-list/services-list.component';
import { TestComponent } from './test/test.component';
import {AccordionModule} from 'primeng/accordion';
@NgModule({
  declarations: [ServicesListComponent, TestComponent],
    imports: [
      AccordionModule,
        HttpClientModule,
        CommonModule,
        ConfirmDialogModule,
        ServiceRoutingModule,
        TableModule,
        CheckboxModule,
        ButtonModule,
        MatTableModule,
        NgbModule,
        NbActionsModule,
        NbButtonModule,
        NbCardModule,
        NbCheckboxModule,
        NbDatepickerModule, NbIconModule,
        NbInputModule,
        NbRadioModule,
        NbSelectModule,
        HttpClientModule,
        DynamicDialogModule,
        NbUserModule, FormsModule,
        ModalModule.forRoot(), Ng2SmartTableModule, PanelModule, DialogModule,
        FileUploadModule, TooltipModule,
        Ng2TelInputModule,

    ],
  providers: [UtilsServiceService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: InterceptService,
    //   multi: true
    // }, 
     ConfirmationService, DialogService],
})
export class ServiceModule { }
