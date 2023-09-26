import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appColumns]'
})
export class FormStepperColumnDirective {

  @Input()
  public appColumns?: number;


  // If name of "appColumns" property is changed, change also this accordingly!
  public static namedAttribute = 'ng-reflect-app-columns';
  
}
