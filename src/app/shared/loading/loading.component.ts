import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { selectIsLoading } from 'src/app/core/state/selectors/core.selectors';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
  ]
})
export class LoadingComponent {

  public loading = this.store.select(selectIsLoading);

  constructor(
    private store: Store,
  ) { }

}