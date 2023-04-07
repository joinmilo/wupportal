import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MediaEntity } from 'src/schema/schema';
import { faviconConfig, mediaApi } from '../constants/core.constants';
import { selectConfiguration } from '../state/core.selectors';

@Injectable({ providedIn: 'root' })
export class FavIconService {

  constructor(
    private store: Store,
  ) {
    this.store.select(selectConfiguration(faviconConfig))
      .subscribe(config => {
        const favIcon = document?.querySelector('#favicon') as HTMLLinkElement;

        if (favIcon?.href && config?.media?.id) {
          favIcon.href = mediaApi(config?.media as MediaEntity);
        }
      });
  }
  
}
