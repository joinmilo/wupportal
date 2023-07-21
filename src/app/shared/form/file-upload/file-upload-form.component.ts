import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subject, takeUntil } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';

@Component({
  selector: 'app-file-upload-form',
  templateUrl: './file-upload-form.component.html',
  styleUrls: ['./file-upload-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadFormComponent,
    }
  ],
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,

    ReactiveFormsModule,

    FontAwesomeModule,

    MatButtonModule,
  ]
})
export class FileUploadFormComponent implements ControlValueAccessor, OnDestroy {

  public control = new FormControl(false);

  private onChange?: (value?: boolean) => void;
  private onTouched?: () => void;

  private destroy = new Subject<void>();

  constructor() {
    this.control.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(value => {
        this.onChange && this.onChange(!!value);
        this.onTouched && this.onTouched();
      })
  }

  public writeValue(value: boolean): void {
    this.control.setValue(value);
  }

  public registerOnChange(onChange: (value?: boolean) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched?: () => void): void {
    this.onTouched = onTouched;
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}