import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { portalNameConfig } from '../constants/core.constants';
import { selectConfiguration } from '../state/selectors/core.selectors';

@Injectable({ providedIn: 'root' })
export class BrowserTitleService {

  constructor(
    private store: Store,
    private title: Title,
  ) {
    this.store.select(selectConfiguration(portalNameConfig))
      .subscribe(config => config?.value && this.title.setTitle(config?.value));
  }
  
}
