import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorDetailsComponent } from './components/details/author-details.component';
import { AuthorOverviewComponent } from './components/overview/author-overview.component';
import { authorId } from './constants/author.constant';

const routes: Routes = [
  {
    path: `:${authorId}`,
    component: AuthorDetailsComponent
  },
  {
    path: '',
    component: AuthorOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorPortalRoutingModule { }
