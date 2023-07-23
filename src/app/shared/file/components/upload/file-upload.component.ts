import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {

  @Output()
  public uploads: EventEmitter<File[]> = new EventEmitter();

  @Input()
  public disabled = false;

  public isDraggedOver = false;

  @HostListener('dragover', ['$event'])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.isDraggedOver = !this.disabled;
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

    if ((!this.disabled)
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
    this.uploads.emit(Array.from(fileList));  
  }

}