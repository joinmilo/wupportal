import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { calendarFeatureKey } from 'src/app/core/constants/core.constants';

const routes: Routes = [
  {
    path: calendarFeatureKey,
    loadChildren: () => import('src/app/features/calendar/portal/main/portal-calendar.module')
      .then((imported) => imported.PortalCalendarModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarPortalRoutingModule { }
