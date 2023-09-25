import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { Maybe } from 'src/app/core/api/generated/schema';

@Component({
  selector: 'app-form-row',
  templateUrl: './form-row.component.html',
  styleUrls: ['./form-row.component.scss']
})
export class FormRowComponent implements AfterViewInit {

  @Input()
  public fullWidth = true;

  @ViewChild('container')
  public container?: ElementRef;

  constructor(
    private renderer: Renderer2,
  ) {}

  public ngAfterViewInit(): void {
    // console.log(this.container?.nativeElement.children)

    const childsAmount: Maybe<number> = this.container?.nativeElement.children.length;

    if (childsAmount) {
      const width = !this.fullWidth && childsAmount === 1
        ? 50
        : 100 / childsAmount;
  
      Array.from(this.container?.nativeElement.children as HTMLCollection).forEach((element: Element) => {
  
        this.renderer.setStyle(element, 'width', `calc(${width}% - 1rem)`);
      });
    }
  }

}