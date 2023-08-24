import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Maybe } from 'src/app/core/api/generated/schema';

@Component({
  selector: 'app-phone-piece',
  templateUrl: './phone-piece.component.html',
  styleUrls: ['./phone-piece.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
  ]
})
export class PhonePieceComponent {

  @Input()
  public phone?: Maybe<string>;

}
