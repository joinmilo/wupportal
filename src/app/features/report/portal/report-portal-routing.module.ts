import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { reportsFeatureKey } from 'src/app/core/constants/feature.constants';

const routes: Routes = [
  {
    path: reportsFeatureKey,
    loadChildren: () => import('src/app/features/report/portal/main/portal-report.module')
      .then((imported) => imported.PortalReportModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportPortalRoutingModule { }
