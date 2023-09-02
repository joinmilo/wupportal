import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { surveysFeatureKey } from 'src/app/core/constants/feature.constants';
import { slug } from 'src/app/core/constants/queryparam.constants';

const routes: Routes = [
  {
    path: surveysFeatureKey,
    loadChildren: () => import('src/app/features/survey/portal/overview/portal-survey-overview.module')
      .then((imported) => imported.PortalSurveyOverviewModule),
  },
  {
    path: `${surveysFeatureKey}/:${slug}`,
    loadChildren: () => import('src/app/features/survey/portal/details/portal-survey-details.module')
      .then((imported) => imported.PortalSurveyDetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyPortalRoutingModule { }
