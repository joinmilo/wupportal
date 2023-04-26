import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { Maybe } from 'src/schema/schema';
import { EventFilterActions } from '../../state/event-filter.actions';
import { selectTargetGroups } from '../../state/event-filter.selectors';

@Component({
  selector: 'app-event-targetgroup-filter',
  templateUrl: './event-targetgroup-filter.component.html',
  styleUrls: ['./event-targetgroup-filter.component.scss']
})
export class EventTargetgroupFilterComponent implements OnInit {

  @Input()
  public queryParamKey?: string;

  @Output()
  public valueChanged = new EventEmitter<Maybe<string[]> | undefined>();

  public control = new FormControl();

  public targetGroups = this.store.select(selectTargetGroups).pipe(
    tap(targetGroups => !targetGroups?.length
      && this.store.dispatch(EventFilterActions.getTargetGroups()))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.queryParamKey && this.activatedRoute.queryParams
      .pipe(take(1))
      .subscribe(params => {
        if (this.queryParamKey) {
          this.control.patchValue(typeof params[this.queryParamKey] === 'string'
           ? [params[this.queryParamKey]]
           : params[this.queryParamKey]);
        }  
      })
  }

  public changeSelect(targetGroupIds: Maybe<string[]>) {
    this.valueChanged.emit(targetGroupIds);
    if (this.queryParamKey) {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          [this.queryParamKey || '']: targetGroupIds
        },
        queryParamsHandling: 'merge',
      });
    }
  }
  
}
