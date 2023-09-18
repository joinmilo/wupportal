import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSettingsLabelComponent } from './component/admin-settings-label.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSettingsLabelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSettingsLabelRoutingModule { }
