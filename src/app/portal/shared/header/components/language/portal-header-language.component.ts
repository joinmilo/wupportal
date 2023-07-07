import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreActions } from 'src/app/core/state/actions/core.actions';
import { selectLanguages } from 'src/app/core/state/selectors/core.selectors';
import { selectCurrentUser } from 'src/app/core/state/selectors/user.selectors';
import { LanguageEntity } from 'src/schema/schema';

@Component({
  selector: 'app-portal-header-language',
  templateUrl: './portal-header-language.component.html',
  styleUrls: ['./portal-header-language.component.scss'],
})
export class PortalHeaderLanguageComponent {
  
  public currentUser = this.store.select(selectCurrentUser);

  public languages = this.store.select(selectLanguages);

  constructor(private store: Store) {}

  public changeLanguage(language: LanguageEntity) {
    this.store.dispatch(CoreActions.changeLanguage(language));
  }
}