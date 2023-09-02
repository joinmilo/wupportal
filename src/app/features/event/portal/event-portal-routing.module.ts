import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { eventsFeatureKey } from 'src/app/core/constants/feature.constants';
import { slug } from 'src/app/core/constants/queryparam.constants';

const routes: Routes = [
  {
    path: eventsFeatureKey,
    loadChildren: () => import('src/app/features/event/portal/overview/portal-event-overview.module')
      .then((imported) => imported.PortalEventOverviewModule),
  },
  {
    path: `${eventsFeatureKey}/:${slug}`,
    loadChildren: () => import('src/app/features/event/portal/details/portal-event-details.module')
      .then((imported) => imported.PortalEventDetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPortalRoutingModule { }
