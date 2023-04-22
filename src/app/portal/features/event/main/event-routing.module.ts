import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailsComponent } from './components/details/event-details.component';
import { EventOverviewComponent } from './components/overview/event-overview.component';
import { eventSlug } from './constants/event.constant';

const routes: Routes = [
  {
    path: `:${eventSlug}`,
    component: EventDetailsComponent
  },
  {
    path: '',
    component: EventOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventPortalRoutingModule { }
