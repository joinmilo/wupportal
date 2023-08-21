import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from 'src/app/core/core.module';
import { Maybe } from 'src/schema/schema';

@Component({
  selector: 'app-website-piece',
  templateUrl: './website-piece.component.html',
  styleUrls: ['./website-piece.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,
    FontAwesomeModule,
  ]
})
export class WebsitePieceComponent {

  @Input()
  public website?: Maybe<string>;
}
