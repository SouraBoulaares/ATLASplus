import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'entitie',
      loadChildren: () => import('./entitie-management/entitie-management.module')
        .then(m => m.EntitieManagementModule),
    },
    
    {
      path: 'service',
      loadChildren: () => import('./service-management/service.module')
        .then(m => m.ServiceModule),
    },
   
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {

}
