import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalPageComponent } from './components/page/page.component';
import { pageSlug } from './constants/page.constants';
import { PageResolver } from './services/page.resolver';

const routes: Routes = [
  {
    path: `/:${pageSlug}`,
    resolve: PageResolver,
    component: PortalPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagePortalRoutingModule { }
