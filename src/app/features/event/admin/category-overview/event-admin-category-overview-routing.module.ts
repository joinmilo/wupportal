import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventAdminCategoryOverviewComponent } from './component/event-admin-category-overview.component';

const routes: Routes = [
  {
    path: '',
    component: EventAdminCategoryOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventAdminCategoryRoutingModule { }
