import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MediaEntity } from 'src/schema/schema';
import { faviconConfig } from '../constants/core.constants';
import { selectConfiguration } from '../state/selectors/core.selectors';

@Injectable({ providedIn: 'root' })
export class FavIconService {

  constructor(
    private store: Store,
  ) {
    this.store.select(selectConfiguration(faviconConfig))
      .subscribe(config => {
        const favIcon = document?.querySelector('#favicon') as HTMLLinkElement;

        if (favIcon?.href && config?.media?.url) {
          favIcon.href = (config?.media as MediaEntity).url as string;
        }
      });
  }
  
}
