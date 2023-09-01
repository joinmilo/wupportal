import { Directive, HostListener, Input } from '@angular/core';
import { MatTooltip, TooltipPosition } from '@angular/material/tooltip';
import { Maybe } from 'src/app/core/api/generated/schema';
import { TranslationService } from 'src/app/core/services/translation.service';

@Directive({
  selector: '[appTooltip]',
  providers: [MatTooltip],
})
export class TooltipDirective {

  @Input()
  public appTooltip?: Maybe<string>;

  @Input()
  public direction?: TooltipPosition;

  constructor(
    private tooltip: MatTooltip,
    private translationService: TranslationService,
  ) { }

  @HostListener('mouseover')
  public onMouseOver(): void {
    this.translationService
      .label(this.appTooltip)
      .subscribe(label => {
        if (label) {
          this.tooltip.message = label;
          this.tooltip.position = this.direction ?? 'below';
          this.tooltip.show();
        }
      });
  }

  @HostListener('mouseout')
  public onMouseOut(): void {
    this.tooltip.hide();
  }

}
