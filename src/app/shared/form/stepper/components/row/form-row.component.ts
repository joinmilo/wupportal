import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { Maybe } from 'src/app/core/api/generated/schema';
import { maxMobileSize } from 'src/app/core/constants/core.constants';

@Component({
  selector: 'app-form-row',
  templateUrl: './form-row.component.html',
  styleUrls: ['./form-row.component.scss']
})
export class FormRowComponent implements AfterViewInit {

  @Input()
  public fillColumns?: number;

  @ViewChild('container')
  public container?: ElementRef;

  public maxMobileSize = maxMobileSize;

  private destroy = new Subject<void>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private renderer: Renderer2,
  ) {}

  public ngAfterViewInit(): void {
    this.desktopWidth();
    this.mobileWidth();
  }

  private desktopWidth(): void {
    const childsAmount: Maybe<number> = this.container?.nativeElement.children.length;
    if (childsAmount) {

      const width = this.fillColumns
        ? 100 / (childsAmount + this.fillColumns)
        : 100 / childsAmount;
  
      Array.from(this.container?.nativeElement.children as HTMLCollection)
        .forEach((element: Element) =>
          this.renderer.setStyle(element, 'width', `calc(${width}% - 1rem)`)
        );
    }
  }

  private mobileWidth(): void {
    this.breakpointObserver.observe([
      `(max-width: ${this.maxMobileSize}px)`,
      `(min-width: ${this.maxMobileSize}px)`,
    ]).pipe(
      map(() => this.breakpointObserver.isMatched(`(max-width: ${this.maxMobileSize}px)`)),
      filter(isMobile => !!isMobile),
      takeUntil(this.destroy)
    ).subscribe(() => {
      Array.from(this.container?.nativeElement.children as HTMLCollection)
        .forEach((element: Element) =>
          this.renderer.setStyle(element, 'width', `100%`)
        )
    })
  }

}