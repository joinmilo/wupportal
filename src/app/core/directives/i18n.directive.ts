import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LabelService } from '../services/label.service';

@Directive({
  selector: '[appI18n]'
})
export class I18nDirective implements OnInit, OnDestroy {

  @Input()
  public appI18n?: string; 

  private destroy = new Subject<void>();

  constructor(
    private el: ElementRef,
    private labelService: LabelService) { }

  public ngOnInit(): void {
    this.labelService.lookup(this.appI18n)
      .subscribe(label => this.el.nativeElement.innerHTML = label);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}