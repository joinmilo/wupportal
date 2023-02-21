import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalPageComponent } from './components/page/page.component';
import { pageSlug } from './constants/page.constants';

const routes: Routes = [
  {
    path: '',
    component: PortalPageComponent
  },
  {
    path: `:${pageSlug}`,
    component: PortalPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagePortalRoutingModule { }
