import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEntitieComponent } from './list-entitie/list-entitie.component';


const routes: Routes = [

  { path: "configuration", component: ListEntitieComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitieManagementRoutingModule { }
