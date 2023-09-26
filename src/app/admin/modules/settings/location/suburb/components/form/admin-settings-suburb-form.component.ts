import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Maybe } from 'src/app/core/api/generated/schema';
import { adminUrl, settingsUrl } from 'src/app/core/constants/module.constants';
import { id } from 'src/app/core/constants/queryparam.constants';
import { AppValidators } from 'src/app/core/validators/validators';
import { baseRoute } from '../../../admin-settings-location.routing.module';
import { AdminSettingsSuburbActions } from '../../state/admin-settings-suburb.actions';
import { selectEditableSuburb } from '../../state/admin-settings-suburb.selectors';

@Component({
  selector: 'app-admin-settings-suburb-form',
  templateUrl: './admin-settings-suburb-form.component.html',
  styleUrls: ['./admin-settings-suburb-form.component.scss'],
})
export class AdminSettingsSuburbFormComponent implements OnInit, OnDestroy {

  public form = this.fb.group({
    id: ['' as Maybe<string>],
    name: ['' as Maybe<string>, [Validators.required]],
    longitude: ['' as Maybe<string>, [Validators.required, AppValidators.digitNumbers(),]],
    latitude: ['' as Maybe<string>, [Validators.required, AppValidators.digitNumbers(),]],
  });

  private destroy = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params.pipe(
      tap(params => this.store.dispatch(AdminSettingsSuburbActions.getSuburb(params[id] || ''))),
      switchMap(() => this.store.select(selectEditableSuburb)),
      takeUntil(this.destroy)
    ).subscribe(suburb => {
      if (suburb) {
        this.form = this.fb.group({
          id: [suburb?.id],
          name: [suburb?.name, [Validators.required]],
          longitude: [suburb?.latitude?.toString(), [Validators.required, AppValidators.digitNumbers(),]],
          latitude: [suburb?.longitude?.toString(), [Validators.required, AppValidators.digitNumbers(),]],
        });
      }
    });
  }

  public cancelled(): void {
    this.store.dispatch(AdminSettingsSuburbActions.cancelled());
    this.router.navigate([adminUrl, settingsUrl, baseRoute, 'suburbs']);
  }

  public saved(): void {
    this.store.dispatch(AdminSettingsSuburbActions.save({
      id: this.form.value.id,
      name: this.form.value.name,
      longitude: Number(this.form.value.longitude?.replace(',', '.')),
      latitude: Number(this.form.value.latitude?.replace(',', '.'))
    }));
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
