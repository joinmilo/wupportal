import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { maxRating } from 'src/app/core/constants/core.constants';
import { selectConfiguration } from 'src/app/core/state/selectors/core.selectors';
import { Maybe, RatingDto } from 'src/schema/schema';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {

  @Input()
  public ratings?: Maybe<RatingDto>;

  @Input()
  public currentValue?: Maybe<number>;

  @Output()
  rating: EventEmitter<number> = new EventEmitter<number>();

  public maxRating = this.store.select(selectConfiguration(maxRating))
    .pipe(map(config => Number(config?.value)))

  constructor(
    private store: Store) { }

  public rated(value: number): void {
    this.rating.emit(value);
  }
}
