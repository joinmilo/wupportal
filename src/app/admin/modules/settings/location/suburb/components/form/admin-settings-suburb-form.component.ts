import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppValidators } from 'src/app/core/validators/validators';
import { AdminSettingsSuburbActions } from '../../state/admin-settings-suburb.actions';

@Component({
  selector: 'app-admin-settings-suburb-form',
  templateUrl: './admin-settings-suburb-form.component.html',
  styleUrls: ['./admin-settings-suburb-form.component.scss'],
})
export class AdminSettingsSuburbFormComponent {

  public form = this.fb.group({
    name: ['', [Validators.required]],
    longitude: ['', [Validators.required, AppValidators.digitNumbers(),]],
    latitude: ['', [Validators.required, AppValidators.digitNumbers(),]],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) { }

  public cancelled(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  public saved(): void {
    this.store.dispatch(AdminSettingsSuburbActions.save({
      name: this.form.value.name,
      longitude: Number(this.form.value.longitude?.replace(',', '.')),
      latitude: Number(this.form.value.latitude?.replace(',', '.'))
    }));
  }

}
