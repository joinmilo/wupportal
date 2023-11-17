import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Maybe } from 'src/app/core/api/generated/schema';
import { OrganisationAdminConfigurationActions } from '../state/organisation-admin-configuration.actions';
import { selectEditableConfiguration, selectRoles } from '../state/organisation-admin-configuration.selectors';

@Component({
  selector: 'app-organisation-admin-configuration',
  templateUrl: './organisation-admin-configuration.component.html',
  styleUrls: ['./organisation-admin-configuration.component.scss']
})
export class OrganisationAdminConfigurationComponent implements OnDestroy {

  public form = this.fb.group({
    id: ['' as Maybe<string>],
    approvalRequired: [undefined as Maybe<boolean>, [Validators.required]],
    memberRole: ['' as Maybe<string>, [Validators.required]],
  });

  public roles = this.store.select(selectRoles);

  private destroy = new Subject<void>();  
  
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.store.dispatch(OrganisationAdminConfigurationActions.getOrganisationConfiguration());
    this.store.dispatch(OrganisationAdminConfigurationActions.getRoles());

    this.store.select(selectEditableConfiguration)
      .pipe(takeUntil(this.destroy))
      .subscribe(configuration => this.form.patchValue({
        id: configuration?.id,
        approvalRequired: configuration?.approvalRequired,
        memberRole: configuration?.memberRole?.id
      }));
  }

  public cancelled(): void {
    this.location.back();
  }

  public saved(): void {
    this.store.dispatch(OrganisationAdminConfigurationActions.save({
      id: this.form?.value.id,
      approvalRequired: this.form.value.approvalRequired,
      memberRole: {
        id: this.form.value.memberRole
      }
    }));
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
