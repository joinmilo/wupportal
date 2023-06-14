import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { Maybe } from 'src/schema/schema';
import { EventFilterDefinition } from '../../constants/event-filter.constants';
import { EventFilterActions } from '../../state/event-filter.actions';
import { selectSuburbs } from '../../state/event-filter.selectors';

@Component({
  selector: 'app-event-filter-suburb',
  templateUrl: './event-filter-suburb.component.html',
  styleUrls: ['./event-filter-suburb.component.scss']
})
export class EventFilterSuburbComponent implements OnInit, OnDestroy {

  @Input()
  public queryParamKey = EventFilterDefinition.suburbs;

  @Output()
  public valueChanged = new EventEmitter<Maybe<string[]> | undefined>();

  public control = new FormControl();

  private destroy = new Subject<void>();

  public suburbs = this.store.select(selectSuburbs).pipe(
    tap(suburbs => !suburbs?.length
      && this.store.dispatch(EventFilterActions.getSuburbs()))
  );

  constructor(
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) {
    this.watchClear();
    this.watchValueChange();
  }
  
  public ngOnInit(): void {
    this.queryParamKey && this.activatedRoute.queryParams
      .pipe(take(1))
      .subscribe(params => {
        const value = typeof params[this.queryParamKey] === 'string'
          ? [params[this.queryParamKey]]
          : params[this.queryParamKey];

        this.control.setValue(value, {
          emitEvent: false,
        });
      });
  }

  private watchClear(): void {
    //TODO: This seems hacky to subscribe to actions within a component
    this.actions.pipe(
      ofType(EventFilterActions.clearAll),
      takeUntil(this.destroy)
    ).subscribe(() => this.control.setValue(undefined, {
      emitEvent: false,
    }));
  }

  private watchValueChange(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((ids: Maybe<string[]>) => {
        if (this.queryParamKey) {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
              [this.queryParamKey || '']: ids
            },
            queryParamsHandling: 'merge',
          });
        }

        this.valueChanged.emit(ids);
        this.store.dispatch(EventFilterActions.selectedSuburbs(ids));
      });
  }

  public ngOnDestroy(): void {
    this.control.setValue(undefined);

    this.destroy.next();
    this.destroy.complete();
  }

}
