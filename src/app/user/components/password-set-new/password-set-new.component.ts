import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { slug } from 'src/app/core/constants/core.constants';
import { UserActions } from 'src/app/user/state/user.actions';


@Component({
  selector: 'app-password-set-new',
  templateUrl: './password-set-new.component.html',
  styleUrls: [
    '../form.scss',
    './password-set-new.component.scss'
  ],
})
export class PasswordSetNewComponent {

  public form = this.fb.group({
    password: ['', [Validators.required]]
  });

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  public onSubmit() {
   this.route.paramMap.pipe(
    take(1),
    tap(params => {
      this.store.dispatch(UserActions.resetPassword(
        params.get(slug),
        this.form.value.password as string
      ))
    })).subscribe();
 }
}