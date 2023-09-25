import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Maybe } from 'src/app/core/api/generated/schema';
import { CoreModule } from 'src/app/core/core.module';

@Component({
  selector: 'app-confirm-cancel',
  templateUrl: './confirm-cancel.component.html',
  styleUrls: ['./confirm-cancel.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,

    MatButtonModule,
    MatDialogModule,
  ]
})
export class ConfirmCancelComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public context: Maybe<string>) { }

}
