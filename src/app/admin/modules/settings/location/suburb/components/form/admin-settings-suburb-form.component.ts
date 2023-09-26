import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Maybe } from 'src/app/core/api/generated/schema';

@Component({
  selector: 'app-admin-settings-suburb-form',
  templateUrl: './admin-settings-suburb-form.component.html',
  styleUrls: ['./admin-settings-suburb-form.component.scss'],
})
export class AdminSettingsSuburbFormComponent {

  public form = this.fb.group({
    name: ['test', []],
    longitude: ['', []],
    latitude: ['', [Validators.required]],
    test: this.fb.group({
      test2: ['test2']
    })
  });

  constructor(
    private fb: FormBuilder,
  ) { }

  saved($event: Maybe<string>) {
    console.log($event);
    }

}
