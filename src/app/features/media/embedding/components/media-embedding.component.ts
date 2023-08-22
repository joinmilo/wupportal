import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MediaEmbeddingActions } from '../state/media-embedding.actions';
import { selectRecentMedia } from '../state/media-embedding.selectors';

@Component({
  selector: 'app-media-embedding',
  templateUrl: './media-embedding.component.html',
  styleUrls: ['./media-embedding.component.scss']
})
export class MediaEmbeddingComponent {

  public recentMedia = this.store.select(selectRecentMedia);

  constructor(
    private store: Store,
  ) {
    this.store.dispatch(MediaEmbeddingActions.getRecentMedia());
  }

}
