import { Directive, Input } from '@angular/core';
import { Maybe } from 'src/app/core/api/generated/schema';

@Directive({
  selector: '[appAssignColumns]'
})
export class ColumnDirective {

  @Input()
  public appAssignColumns?: Maybe<number>;

  // If name of 'appAssignColumns' property is changed, change also this accordingly!
  public static namedAttribute = 'ng-reflect-app-assign-columns';
  
}
