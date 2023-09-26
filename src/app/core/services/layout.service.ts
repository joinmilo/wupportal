import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { maxMobileSize } from '../constants/core.constants';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  public maxMobileSize = maxMobileSize;

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
