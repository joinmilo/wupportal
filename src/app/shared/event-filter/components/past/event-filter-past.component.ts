import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import { Maybe } from 'src/schema/schema';
import { EventFilterActions } from '../../state/event-filter.actions';
import { EventFilterQueryDefinition } from '../../typings/event-filter-query-param';

@Component({
  selector: 'app-event-filter-past',
  templateUrl: './event-filter-past.component.html',
  styleUrls: ['./event-filter-past.component.scss']
})
export class EventFilterPastComponent implements OnInit, OnDestroy {

  @Input()
  public queryParamKey = EventFilterQueryDefinition.past;

  @Output()
  public valueChanged = new EventEmitter<Maybe<boolean> | undefined>();

  public control = new FormControl();

  private destroy = new Subject<void>();

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
        const value = params[this.queryParamKey];
        this.control.setValue(value?.toLowerCase?.() === 'true', {
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
      .subscribe((value: boolean) => {
        if (this.queryParamKey) {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: {
              [this.queryParamKey]: value
            },
            queryParamsHandling: 'merge',
          });
        }

        this.valueChanged.emit(value);
        this.store.dispatch(EventFilterActions.selectedPast(value));
      });
  }

  public ngOnDestroy(): void {
    this.control.setValue(undefined);

    this.destroy.next();
    this.destroy.complete();
  }
  
}
