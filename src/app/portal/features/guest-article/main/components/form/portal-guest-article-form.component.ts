import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PortalGuestArticleActions } from '../../state/portal-guest-article.actions';

@Component({
  selector: 'app-portal-guest-article-form',
  templateUrl: './portal-guest-article-form.component.html',
  styleUrls: ['./portal-guest-article-form.component.scss'],
})
export class PortalGuestArticleFormComponent {

  public form = this.fb.group({
    name: ['', [Validators.required]],
    content: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: [''],
  });

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) { }

  public onSubmit(captchaToken: string) {
    this.store.dispatch(PortalGuestArticleActions.saveArticle({
      content: this.form.value.content, 
      publicAuthor: {
        name: this.form.value.name,
        email: this.form.value.email,
        phone: this.form.value.phone
      },
      captchaToken: captchaToken,
    }));
    
  }

}

