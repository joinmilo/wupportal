import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { eventSlug } from './constants/event.constant';
import { EventDetailsComponent } from './pages/details/event-details.component';

const routes: Routes = [

  {
    path: `:${eventSlug}`,
    component: EventDetailsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventPortalRoutingModule { }
