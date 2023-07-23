import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreActions } from 'src/app/core/state/actions/core.actions';
import { FeedbackType } from 'src/app/core/typings/feedback';

@Component({
  selector: 'app-file-upload-form',
  templateUrl: './file-upload-form.component.html',
  styleUrls: ['./file-upload-form.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     multi: true,
  //     useExisting: FileUploadFormComponent,
  //   }
  // ],
})
export class FileUploadFormComponent {

  @Output()
  public uploads: EventEmitter<File[]> = new EventEmitter();

  @Input()
  public maxFiles? = 5;

  // default 2mb
  @Input()
  public maxFileSize = 1024 * 1024 * 2

  public errorMessage?: string;

  public files: File[] = [];

  public isDraggedOver = false;


  public labelVariables = new Map([
    ['maxFiles', this.maxFiles?.toString()],
    ['maxFileSize', '2mb']
  ]);

  public notBeLargerLabel = 'filesCannotBeLargerThanX';

  constructor(
    private store: Store,
  ) { }

  @HostListener('dragover', ['$event'])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    if (!this.maxFiles || this.files.length < this.maxFiles) {
      this.isDraggedOver = true;
    }
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.isDraggedOver = false;
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.isDraggedOver = false;

    if ((!this.maxFiles || this.files.length < this.maxFiles)
      && evt?.dataTransfer?.files?.length) {
        this.addFiles(evt.dataTransfer.files);
    }
  }

  public onFileBrowse(event: Event) {
    const files = (event?.target as HTMLInputElement)?.files;
    if (files?.length) {
      this.addFiles(files);
    }
  }

  public addFiles(fileList: FileList) {

    const newFiles = [...Array.from(fileList)];
    if (newFiles.some(file => file.size > this.maxFileSize)) {
      this.store.dispatch(CoreActions.setFeedback({
        type: FeedbackType.Error,
        labelMessage: this.notBeLargerLabel,
        labelAction: 'chooseOtherFile',
        labelVariables: this.labelVariables,
      }))
    } else {
      const files = [...this.files, ...Array.from(fileList)];
  
      if (!this.maxFiles || files?.length <= this.maxFiles) {
        this.files = files;
        this.uploads.emit(this.files);
      }
    }
    

  }

  public removeFile(fileIndex: number) {
    this.files.splice(fileIndex);
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