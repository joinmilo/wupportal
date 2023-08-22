import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { CardType } from 'src/app/shared/widgets/card/typings/card';
import { AuthorEmbeddingActions } from '../state/author-embedding.actions';
import { selectRecentAuthors } from '../state/author-embedding.selectors';

@Component({
  selector: 'app-author-embedding',
  templateUrl: './author-embedding.component.html',
  styleUrls: ['./author-embedding.component.scss']
})
export class AuthorEmbeddingComponent {

  public cardType = CardType.Contact;
  
  public authors = this.store.select(selectRecentAuthors).pipe(
    tap(result => !result?.length
      && this.store.dispatch(AuthorEmbeddingActions.getRecentAuthors())));

  constructor(
    private store: Store, 
  ) { }

}
