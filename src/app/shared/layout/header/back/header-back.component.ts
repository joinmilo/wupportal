import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-header-back',
  templateUrl: './header-back.component.html',
  styleUrls: ['./header-back.component.scss'],
  standalone: true,
  imports: [
    CommonModule,

    FontAwesomeModule,
    MatButtonModule,
  ]
})
export class HeaderBackComponent {

  constructor(
    private navigationService: NavigationService,
  ) { }

  public back(): void {
    this.navigationService.back();
  }

}