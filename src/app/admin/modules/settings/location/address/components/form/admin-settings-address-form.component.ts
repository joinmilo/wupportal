import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, filter, switchMap, take, tap } from 'rxjs';
import { AddressEntity, Maybe } from 'src/app/core/api/generated/schema';
import { id } from 'src/app/core/constants/queryparam.constants';
import { AdminSettingsAddressActions } from '../../state/admin-settings-address.actions';
import { selectEditableAddress } from '../../state/admin-settings-address.selectors';

@Component({
  selector: 'app-admin-settings-address-form',
  templateUrl: './admin-settings-address-form.component.html',
  styleUrls: ['./admin-settings-address-form.component.scss'],
})
export class AdminSettingsAddressFormComponent implements OnInit, OnDestroy {

  public form = this.fb.group({
    id: ['' as Maybe<string>],
    address: [{} as AddressEntity, [Validators.required]],
  });

  private destroy = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store,
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params.pipe(
      filter(params => !!params[id]),
      tap(params => this.store.dispatch(AdminSettingsAddressActions.getAddress(params[id]))),
      switchMap(() => this.store.select(selectEditableAddress)),
      filter(address => !!address),
      take(1)
    ).subscribe(address =>
      this.form = this.fb.group({
        id: [address?.id],
        address: [address as AddressEntity, [Validators.required]],
      }));
  }

  public cancelled(): void {
    this.store.dispatch(AdminSettingsAddressActions.cancelled());
  }

  public saved(): void {
    // this.store.dispatch(AdminSettingsAddressActions.save({
    //   id: this.form.value.id,
    //   name: this.form.value.name,
    //   longitude: Number(this.form.value.longitude?.replace(',', '.')),
    //   latitude: Number(this.form.value.latitude?.replace(',', '.'))
    // }));
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}
