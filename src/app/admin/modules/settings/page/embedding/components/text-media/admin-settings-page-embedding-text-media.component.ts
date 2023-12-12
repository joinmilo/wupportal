import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Maybe, MediaEntity, PageAttributeEntity, PageEmbeddingEntity } from 'src/app/core/api/generated/schema';
import { AdminSettingsPageEmbeddingActions } from '../../state/admin-settings-page-embedding.actions';
import { selectPlugins } from '../../state/admin-settings-page-embedding.selectors';

@Component({
  selector: 'app-admin-settings-page-embedding-text-media',
  templateUrl: './admin-settings-page-embedding-text-media.component.html',
  styleUrls: ['./admin-settings-page-embedding-text-media.component.scss'],
})
export class AdminSettingsPageEmbeddingTextMediaComponent implements OnInit {

  @Input()
  public embedding?: PageEmbeddingEntity;

  @Output()
  public saved = new EventEmitter<PageEmbeddingEntity>();

  public plugins = this.store.select(selectPlugins);

  public form = this.fb.group({
    id: ['' as Maybe<string>],
    button: ['' as Maybe<string>],
    label: ['', [Validators.required]],
    media: [[] as Maybe<MediaEntity[]>],
    text: ['' as Maybe<string>],
    title: ['' as Maybe<string>],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.store.dispatch(AdminSettingsPageEmbeddingActions.getPlugins());
  }

  public ngOnInit(): void {
    this.form.patchValue({
      id: this.embedding?.id,
      button: this.embedding?.attributes?.find(attribute => attribute?.type?.code === 'button')?.content,
      label: this.embedding?.label,
      title: this.embedding?.attributes?.find(attribute => attribute?.type?.code === 'title')?.content,
      text: this.embedding?.attributes?.find(attribute => attribute?.type?.code === 'text')?.content
    });
  }

  public save(): void {
    this.saved.emit({
      id: this.form.value.id,
      label: this.form.value.label,
      type: {
        id: this.embedding?.type?.id,
        code: this.embedding?.type?.code
      },
      attributes: [
        this.createButton(),
        this.createTitle(),
        this.createText(),
      ]
    })
  }

  private createButton(): Maybe<PageAttributeEntity> {
    return {
      content: this.form.value.button,
      type: {
        id: this.embedding?.attributes?.find(attribute => attribute?.type?.code === 'button')?.type?.id
      }
    };
  }
  
  private createTitle(): Maybe<PageAttributeEntity> {
    return {
      content: this.form.value.title,
      type: {
        id: this.embedding?.attributes?.find(attribute => attribute?.type?.code === 'title')?.type?.id
      }
    };
  }

  private createText(): Maybe<PageAttributeEntity> {
    return {
      content: this.form.value.text,
      type: {
        id: this.embedding?.attributes?.find(attribute => attribute?.type?.code === 'text')?.type?.id
      }
    };
  }

}