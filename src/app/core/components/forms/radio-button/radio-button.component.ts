import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { RadioInput } from '../../../typings/radio-input';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent<T> implements OnInit {

  // public form = this.fb.group({
  //   checked : [false],
  // });

  public checked = false;

  @Input()
  public input?: RadioInput;

  @Input()
  public value?: Observable<T>;

  @Output()
  public valueChanged = new EventEmitter<T>();

  constructor(
    private fb: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.value?.subscribe(value =>
      this.checked = this.input?.value === value);
  }

  public changeSelect(event: MouseEvent): void {
    event.stopPropagation();
    this.valueChanged.emit(this.input?.value as T);
  }
}