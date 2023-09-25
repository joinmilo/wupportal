import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-settings-suburb-form',
  templateUrl: './admin-settings-suburb-form.component.html',
  styleUrls: ['./admin-settings-suburb-form.component.scss'],
})
export class AdminSettingsSuburbFormComponent {

  public form = this.fb.group({
    name: ['', []],
    longitude: ['', []],
    latitude: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
  ) { }

}
