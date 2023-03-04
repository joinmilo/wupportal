import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appI18n]'
})
export class I18nDirective implements OnInit {

  @Input()
  public label?: string; 

  constructor(
    private el: ElementRef) { }


  public ngOnInit(): void {
    this.el.nativeElement.innerHTML = 'test';
  }

}