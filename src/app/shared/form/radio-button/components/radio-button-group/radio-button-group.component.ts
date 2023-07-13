import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, take } from 'rxjs';
import { RadioInput } from '../../typings/radio-input';

@Component({
  selector: 'app-radio-button-group',
  templateUrl: './radio-button-group.component.html',
  styleUrls: ['./radio-button-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RadioButtonGroupComponent
    },
  ]
})
export class RadioButtonGroupComponent<T> implements ControlValueAccessor, OnInit, OnDestroy {

  @Input()
  public value?: T;

  @Input()
  public inputs?: RadioInput[];

  @Input()
  public queryParamKey?: string;

  @Output()
  public valueChanged = new EventEmitter<T>();

  private onChange?: (value?: T) => void;

  private destroy = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    if (this.queryParamKey) {
      this.activatedRoute.queryParams
        .pipe(take(1))
        .subscribe(params => this.emit(params[this.queryParamKey || '']));
    }
  }

  public writeValue(value: T): void {
    this.next(value);
  }

  public next(value?: T) {
    if (this.queryParamKey) {
      this.router.navigate([], {

        queryParams: {
          [this.queryParamKey]: value
        },
        queryParamsHandling: 'merge',
      });
    }
    this.emit(value);
  }

  private emit(value?: T): void {
    if (value) {
      this.value = value;
      this.valueChanged.emit(value);
      this.onChange && this.onChange(value);
    }
  }

  public registerOnChange(onChange: (value?: T) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(): void {
    return;
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}