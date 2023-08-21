import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from 'src/app/core/core.module';
import { Maybe } from 'src/schema/schema';

@Component({
  selector: 'app-mail-piece',
  templateUrl: './mail-piece.component.html',
  styleUrls: ['./mail-piece.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,
    FontAwesomeModule,
  ]
})
export class MailPieceComponent {

  @Input()
  public mail?: Maybe<string>;

}
