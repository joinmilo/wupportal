import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  /** @see {@link /src/styles/mixins.scss} */
  public maxMobileSize = 1023;

  public isMobile = this.breakpointObserver.observe([
    `(max-width: ${this.maxMobileSize}px)`,
    `(min-width: ${this.maxMobileSize}px)`,
  ]).pipe(
    map(() => this.breakpointObserver.isMatched(`(max-width: ${this.maxMobileSize}px)`)),
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }
}
