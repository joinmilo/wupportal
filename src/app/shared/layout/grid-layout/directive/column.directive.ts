import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appAssignColumns]'
})
export class ColumnDirective {

  @Input()
  public appAssignColumns?: number;

  // If name of "appColumns" property is changed, change also this accordingly!
  public static namedAttribute = 'ng-reflect-app-assign-columns';
  
}
