import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventOverviewComponent } from './components/overview/event-overview.component';
import { eventSlug } from './constants/event.constant';
import { EventDetailsComponent } from './pages/details/event-details.component';

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
