import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Maybe } from 'src/app/core/api/generated/schema';
import { CoreModule } from 'src/app/core/core.module';

@Component({
  selector: 'app-confirm-change',
  templateUrl: './confirm-change.component.html',
  styleUrls: ['./confirm-change.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,

    MatButtonModule,
    MatDialogModule,
  ]
})
export class ConfirmChangeComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public context: Maybe<string>) { }

}
