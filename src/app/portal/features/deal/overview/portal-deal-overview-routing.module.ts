import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalDealOverviewComponent } from './components/portal-deal-overview.component';

const routes: Routes = [
  {
    path: '',
    component: PortalDealOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalDealOverviewRoutingModule { }
