import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalPageComponent } from './components/portal-page.component';

const routes: Routes = [
  {
    path: '',
    component: PortalPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalPageRoutingModule { }
