import {NgModule} from '@angular/core';
import {NbCardModule, NbMenuModule, NbTabsetModule} from '@nebular/theme';

import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {ChartModule} from 'primeng/chart';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    TableModule,
    CheckboxModule,
    ButtonModule,
    NbCardModule,
    ChartModule,
    NbTabsetModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
