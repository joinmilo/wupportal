import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalEventDetailsCommentsComponent } from './components/comments/portal-event-details-comments.component';
import { PortalEventDetailsComponent } from './components/portal-event-details.component';

const routes: Routes = [
  {
    path: '',
    component: PortalEventDetailsComponent
  },
  {
    path: 'comments',
    component: PortalEventDetailsCommentsComponent
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalEventDetailsRoutingModule { }
