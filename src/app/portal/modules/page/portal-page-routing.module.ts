import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalPageMediaComponent } from './components/media/portal-page-media.component';
import { PortalPageComponent } from './components/portal-page.component';

const routes: Routes = [
  {
    path: '',
    component: PortalPageComponent
  },
  {
    path: 'media',
    component: PortalPageMediaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalPageRoutingModule { }
