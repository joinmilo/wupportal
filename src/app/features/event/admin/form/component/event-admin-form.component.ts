import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, filter, switchMap, take, tap } from 'rxjs';
import { EventScheduleEntity, Maybe } from 'src/app/core/api/generated/schema';
import { id, slug } from 'src/app/core/constants/queryparam.constants';
import { EventAdminFormActions } from '../state/event-admin-form.actions';
import { selectEvent } from '../state/event-admin-form.selectors';


@Component({
  selector: 'app-event-admin-form',
  templateUrl: './event-admin-form.component.html',
  styleUrls: ['./event-admin-form.component.scss']
})
export class EventAdminFormComponent implements OnInit, OnDestroy {

  public form = this.fb.group({
    id: [undefined as Maybe<string>],
  });

  public scheduleForm = this.fb.group({
    schedules: [undefined as Maybe<EventScheduleEntity[]>],
    icon: [],
  });

  private destroy = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store,
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params.pipe(
      filter(params => !!params[slug]),
      tap(params => this.store.dispatch(EventAdminFormActions.getEvent(params[id]))),
      switchMap(() => this.store.select(selectEvent)),
      filter(event => !!event),
      take(1)
    ).subscribe(event =>
      {
        // this.scheduleForm = this.fb.group({
        //   schedules: [event?.schedules as Maybe<EventScheduleEntity[]>],
        // })
        console.log('test')
      }
    );
  }

  public cancelled(): void {
    //TODO: cancel
  }

  public saved(): void {
    //TODO: Save
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }


}
