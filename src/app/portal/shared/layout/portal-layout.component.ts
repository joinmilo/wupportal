import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoading } from 'src/app/core/state/selectors/core.selectors';
import { LoadingComponent } from 'src/app/shared/layout/loading/loading.component';
import { PortalFooterModule } from '../footer/portal-footer.module';
import { PortalHeaderModule } from '../header/portal-header.module';

@Component({
  selector: 'app-portal-layout',
  templateUrl: './portal-layout.component.html',
  styleUrls: ['./portal-layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,

    LoadingComponent,
    PortalFooterModule,
    PortalHeaderModule,
  ]
})
export class PortalLayoutComponent {

  public loading = this.store.select(selectIsLoading);

  constructor(
    private store: Store,
  ) { }
}
