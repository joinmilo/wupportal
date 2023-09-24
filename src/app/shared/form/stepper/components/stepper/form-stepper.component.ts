import { AfterViewInit, Component, ContentChildren, QueryList } from '@angular/core';
import { FormStepComponent } from '../step/form-step.component';

@Component({
  selector: 'app-form-stepper',
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.scss']
})
export class FormStepperComponent implements AfterViewInit {
  
  @ContentChildren(FormStepComponent)
  private steps?: QueryList<FormStepComponent>;

  ngAfterViewInit(): void {
    console.log(this.steps);
  }

}