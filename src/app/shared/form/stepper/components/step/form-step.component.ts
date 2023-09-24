import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.scss']
})
export class FormStepComponent {

  @Input({ required: true })
  public titleLabel?: string;

  @Input()
  public descriptionLabel?: string;

  @Input()
  public hideToggle = false;


  public back(): void {
    
  }
  
  public next(): void {
    
  }

}