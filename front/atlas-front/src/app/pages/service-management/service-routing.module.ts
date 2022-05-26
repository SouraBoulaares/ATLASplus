import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesListComponent } from './services-list/services-list.component';
import {TestComponent} from "./test/test.component";



const routes: Routes = [{
  path: '',
  children: [
    { path: "configuration", component: ServicesListComponent },
    { path: "test", component: TestComponent }
  ],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {
}
