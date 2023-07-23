import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreActions } from 'src/app/core/state/actions/core.actions';
import { FeedbackType } from 'src/app/core/typings/feedback';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     multi: true,
  //     useExisting: FileUploadFormComponent,
  //   }
  // ],
})
export class FileFormComponent {

  @Output()
  public uploads: EventEmitter<File[]> = new EventEmitter();

  @Input()
  public maxFiles?= 5;

  // default 2mb
  @Input()
  public maxFileSize = 1024 * 1024 * 2

  public files: File[] = [];

  public labelVariables = new Map([
    ['maxFiles', this.maxFiles?.toString()],
    ['maxFileSize', '2mb']
  ]);

  public notBeLargerLabel = 'filesCannotBeLargerThanX';
  public notMoreThanLabel = 'notMoreThanXFiles';

  constructor(
    private store: Store,
  ) { }

  public addFiles(newFiles: File[]) {

    const files = [...this.files, ...newFiles];

    if (newFiles.some(file => file.size > this.maxFileSize)) {
      this.store.dispatch(CoreActions.setFeedback({
        type: FeedbackType.Error,
        labelMessage: this.notBeLargerLabel,
        labelAction: 'chooseOtherFile',
        labelVariables: this.labelVariables,
      }));
    } else if (this.maxFiles && files?.length > this.maxFiles) {
      this.store.dispatch(CoreActions.setFeedback({
        type: FeedbackType.Error,
        labelMessage: this.notMoreThanLabel,
        labelAction: 'chooseLessFiles',
        labelVariables: this.labelVariables,
      }));
    }
    else {
      this.files = files;
      this.uploads.emit(this.files);
    }

  }

  public removeFile(fileIndex: number) {
    this.files.splice(fileIndex, 1);
    this.uploads.emit(this.files);
  }

  // public control = new FormControl(false);

  // private onChange?: (value?: boolean) => void;
  // private onTouched?: () => void;

  // private destroy = new Subject<void>();

  // constructor() {
  //   this.control.valueChanges
  //     .pipe(takeUntil(this.destroy))
  //     .subscribe(value => {
  //       this.onChange && this.onChange(!!value);
  //       this.onTouched && this.onTouched();
  //     })
  // }

  // public writeValue(value: boolean): void {
  //   this.control.setValue(value);
  // }

  // public registerOnChange(onChange: (value?: boolean) => void): void {
  //   this.onChange = onChange;
  // }

  // public registerOnTouched(onTouched?: () => void): void {
  //   this.onTouched = onTouched;
  // }

  // public ngOnDestroy(): void {
  //   this.destroy.next();
  //   this.destroy.complete();
  // }
}