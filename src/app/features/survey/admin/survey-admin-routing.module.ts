import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdminActions } from 'src/app/admin/state/admin.actions';
import { AdminFeatureRoute } from 'src/app/admin/typings/menu';
import { surveysFeatureKey } from 'src/app/core/constants/feature.constants';
import { slug } from 'src/app/core/constants/queryparam.constants';
import { requireAnyPrivilege } from 'src/app/core/utils/privilege.utils';
import { SurveyAdminDetailsLayoutComponent } from './details/modules/layout/components/survey-admin-details-layout.component';

const menuRoutes: AdminFeatureRoute[] = [
  // {
  //   path: `${surveysFeatureKey}/dashboard`,
  //   loadChildren: () => import('src/app/features/survey/portal/details/portal-survey-details.module')
  //     .then((imported) => imported.PortalSurveyDetailsModule),
  //   data: { label: 'dashboard' },
  // },
  {
    path: `${surveysFeatureKey}`,
    loadChildren: () => import('src/app/features/survey/admin/overview/survey-admin-overview.module')
      .then((imported) => imported.SurveyAdminOverviewModule),
    data: {
      label: 'overview',
      privileges: ['surveys_admin', 'surveys_manage']
    },
    canActivate: [requireAnyPrivilege('surveys_admin', 'surveys_manage')]
  },
];

const routes: Routes = [
  {
    path: `${surveysFeatureKey}/:${slug}`,
    loadChildren: () => import('src/app/features/survey/admin/details/survey-admin-details.module')
      .then((imported) => imported.SurveyAdminDetailsModule),
    component: SurveyAdminDetailsLayoutComponent,
    canActivate: [requireAnyPrivilege('surveys_admin', 'surveys_manage')]
  },
  {
    path: `${surveysFeatureKey}/form`,
    loadChildren: () => import('src/app/features/survey/admin/form/survey-admin-form.module')
      .then((imported) => imported.SurveyAdminFormModule),
    canActivate: [requireAnyPrivilege('surveys_admin', 'surveys_manage')],
  },
]

@NgModule({
  imports: [RouterModule.forChild([
    ...menuRoutes,
    ...routes,
  ])],
  exports: [RouterModule]
})
export class SurveyAdminRoutingModule {

  constructor(
    public store: Store
  ) {
    this.store.dispatch(AdminActions.addMainRoutes({
      code: surveysFeatureKey,
      routes: menuRoutes,
    }));
  }
}
