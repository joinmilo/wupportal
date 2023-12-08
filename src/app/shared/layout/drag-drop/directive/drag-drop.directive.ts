import { Directive, TemplateRef } from '@angular/core';

@Directive({ 
  selector: '[appDragDrop]',
})
export class DragDropDirective {
  
  constructor(
    public templateRef: TemplateRef<unknown>
  ) { }
}
