import {
  AfterViewInit,
  Component, ContentChildren,
  ElementRef, QueryList, TemplateRef, ViewChild
} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements AfterViewInit {

  @ViewChild('cards', { static: true, read: ElementRef })
  private cardsContainer!: ElementRef;

  public disableRight = false;

  public disableLeft = true;

  private gap = 32;

  @ContentChildren(TemplateRef, {descendants: true})
  private template?: QueryList<TemplateRef<unknown>>;


  public ngAfterViewInit(): void {
    const gap =  parseFloat(getComputedStyle(document.body).getPropertyValue('--gap'));
    const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    this.gap = (gap || 1) * (fontSize || 16);
  }

  public onScroll() {
    this.disableLeft = this.cardsContainer?.nativeElement.scrollLeft === 0;
    this.disableRight = this.cardsContainer?.nativeElement.scrollLeftMax === this.cardsContainer?.nativeElement.scrollLeft;
  }


  public scroll(forward?: boolean): void {
    const scroll = this.calculateScroll();
    forward
      ? this.cardsContainer.nativeElement.scrollLeft += scroll
      : this.cardsContainer.nativeElement.scrollLeft -= scroll;
  }

  public calculateScroll(): number {
    const containerWidth = this.cardsContainer.nativeElement.offsetWidth;
    if (this.template?.first?.elementRef?.nativeElement?.parentElement?.firstChild?.offsetWidth) {
      const elementWidth = (this.template.first.elementRef.nativeElement.parentElement.firstChild.offsetWidth + this.gap);
      return Math.floor(containerWidth / elementWidth) * elementWidth;
    }
    return 200;
  }
}
