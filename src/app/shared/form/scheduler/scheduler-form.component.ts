import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from '@ckeditor/ckeditor5-core';
import { CoreModule } from 'src/app/core/core.module';
import { GridLayoutModule } from '../../layout/grid-layout/grid-layout.module';

@Component({
  selector: 'app-scheduler-form',
  templateUrl: './scheduler-form.component.html',
  styleUrls: ['./scheduler-form.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SchedulerFormComponent),
      multi: true
    }
  ],
  imports: [
    CommonModule,
    CoreModule,

    GridLayoutModule,
  ]
})

export class SchedulerFormComponent implements ControlValueAccessor {

  public Editor = ClassicEditor;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public editorInstance: any;
  
  public model = {
    editorData: ''
  }

  @Input()
  public config: EditorConfig = {
    toolbar: [
      'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'indent', 'outdent', '|', 'undo', 'redo'
    ]
  };

  public onChange?: (value: string) => void;

  public writeValue(value: string): void {
    this.model.editorData = value;
  }

  public registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(): void {
    return;
  }

  public handleEditorReady(editor: unknown): void {
    this.editorInstance = editor;
  }

  public handleEditorChange(): void {
    this.onChange && this.onChange(
      this.editorInstance.getData()
    );
  }

}
