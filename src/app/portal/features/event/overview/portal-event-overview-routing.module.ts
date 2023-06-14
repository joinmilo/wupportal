import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalEventOverviewComponent } from './components/portal-event-overview.component';

const routes: Routes = [
  {
    path: '',
    component: PortalEventOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalEventOverviewRoutingModule { }
