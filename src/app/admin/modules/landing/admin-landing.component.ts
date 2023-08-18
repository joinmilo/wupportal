import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class AdminLandingComponent {

  constructor(
    private store: Store,
  ) { }
}
