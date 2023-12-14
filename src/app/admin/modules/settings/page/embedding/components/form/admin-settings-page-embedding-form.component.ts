/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import {
  Maybe,
  MediaEntity,
  PageAttributeEntity,
  PageAttributeTypeEntity,
  PageEmbeddingEntity,
} from 'src/app/core/api/generated/schema';
import { TranslationService } from 'src/app/core/services/translation.service';
import { selectPlugins } from '../../state/admin-settings-page-embedding.selectors';
import { PageEmbeddingFormFieldType } from '../../typings/page-embeddings-form';

@Component({
  selector: 'app-admin-settings-page-embedding-form',
  templateUrl: './admin-settings-page-embedding-form.component.html',
  styleUrls: ['./admin-settings-page-embedding-form.component.scss'],
})
export class AdminSettingsPageEmbeddingFormComponent {

  @Input({ required: true })
  public set embedding(embedding: PageEmbeddingEntity) {
    this.initForm(embedding);
  }

  @Output()
  public saved = new EventEmitter<PageEmbeddingEntity>();

  public form = this.createForm();

  public plugins = this.store.select(selectPlugins);

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private translationService: TranslationService
  ) {}

  private initForm(embedding: PageEmbeddingEntity): void {
    this.form = this.createForm();
    this.patchBaseValue(embedding);

    this.initMultiMediaForm(embedding);
    this.initPluginForm(embedding);
    this.initTextMediumForm(embedding);
    this.initTitleButtonForm(embedding);
  }

  private createForm() {
    return this.fb.group({
      base: this.fb.group({
        id: ['' as Maybe<string>],
        label: ['' as Maybe<string>, [Validators.required]],
        type: [
          undefined as Maybe<PageAttributeTypeEntity>,
          [Validators.required],
        ],
      }),
      media: this.fb.group({}),
      plugin: this.fb.group({}),
      textMedium: this.fb.group({}),
      titleButton: this.fb.group({}),
    });
  }

  private patchBaseValue(embedding: PageEmbeddingEntity): void {
    this.form.patchValue({
      base: {
        id: embedding.id,
        label: embedding.label,
        type: {
          id: embedding.type?.id,
          code: embedding.type?.code,
        },
      },
    });
  }

  private initMultiMediaForm(embedding: PageEmbeddingEntity): void {
    const attribute = this.findAttribute('multimedia', embedding);

    if (attribute) {
      this.form.controls.media.addControl(
        'multimedia',
        this.fb.group({
          value: [attribute?.references?.map((reference) => reference?.media)],
          type: {
            id: attribute.type?.id,
            code: attribute.type?.code
          }
        })
      );
    }
  }

  private initPluginForm(embedding: PageEmbeddingEntity): void {
    const attribute = this.findAttribute('plugin', embedding);

    if (attribute) {
      this.form.controls.plugin.addControl(
        'plugin',
        this.fb.group({
          value: [attribute?.references?.[0]?.plugin?.id],
          type: {
            id: attribute.type?.id,
            code: attribute.type?.code
          }
        })
      );
    }
  }

  private initTextMediumForm(embedding: PageEmbeddingEntity) {
    this.initContentControl(
      this.form.controls.textMedium,
      'text',
      embedding
    );

    const attribute = this.findAttribute('media', embedding);
    if (attribute) {
      this.form.controls.textMedium.addControl(
        'media',
        this.fb.group({
          value: [attribute?.references?.map((reference) => reference?.media)],
          type: {
            id: attribute?.id,
            code: attribute.type?.code
          }
        })
      );
    }

  }

  private initTitleButtonForm(embedding: PageEmbeddingEntity): void {
    this.initContentControl(
      this.form.controls.titleButton,
      'title',
      embedding
    );
    this.initContentControl(
      this.form.controls.titleButton,
      'button',
      embedding
    );
  }

  private initContentControl(
    formGroup: FormGroup<{}>,
    field: PageEmbeddingFormFieldType,
    embedding: PageEmbeddingEntity
  ) {
    const attribute = this.findAttribute(field, embedding);
    if (attribute) {
      attribute?.content
        ? formGroup.addControl(field,
            this.fb.group({
              value: [attribute.content],
              type: {
                id: attribute.type?.id,
                code: attribute.type?.code,
              }
            })
          )
        : this.translationService
            .translatable(attribute, 'content')
            .pipe(take(1))
            .subscribe((content) =>
              formGroup.addControl(field, this.fb.group({
                value: [content],
                type: {
                  id: attribute.type?.id,
                  code: attribute.type?.code
                }
              }))
            );
    }
  }

  private findAttribute(
    field: PageEmbeddingFormFieldType,
    embedding: PageEmbeddingEntity
  ): Maybe<PageAttributeEntity> {
    return embedding?.attributes?.find(
      (attribute) => attribute?.type?.code === field
    );
  }

  public hasControl(
    group: FormGroup<{}>,
    field: PageEmbeddingFormFieldType,
  ): boolean {
    return group.contains(field);
  }

  public getControl(group: FormGroup<any>, field: string): FormControl<any> {
    return group.get(field)?.get('value') as FormControl;
  }

  public update(): void {
    this.saved.emit({
      id: this.form.value.base?.id,
      label: this.form.value.base?.label,
      type: {
        id: this.form.value.base?.type?.id,
        code: this.form.value.base?.type?.code
      },
      attributes: this.createAttributeValues()
    })
  }

  private createAttributeValues(): Maybe<Maybe<PageAttributeEntity>[]> {
    const attributes: PageAttributeEntity[] = [];

    if (this.hasControl(this.form.controls.titleButton, 'button')) {
      attributes.push(this.createContentValue(this.form.controls.titleButton, 'button'));
    }

    if (this.hasControl(this.form.controls.textMedium, 'text')) {
      attributes.push(this.createContentValue(this.form.controls.textMedium, 'text'));
    }

    if (this.hasControl(this.form.controls.titleButton, 'title')) {
      attributes.push(this.createContentValue(this.form.controls.titleButton, 'title'));
    }

    if (this.hasControl(this.form.controls.textMedium, 'media')) {
      attributes.push(this.createMediaValue(this.form.controls.textMedium, 'media'));
    }

    if (this.hasControl(this.form.controls.media, 'multimedia')) {
      attributes.push(this.createMediaValue(this.form.controls.media, 'multimedia'));
    }

    if (this.hasControl(this.form.controls.plugin, 'plugin')) {
      attributes.push(this.createPluginValue());
    }

    console.log(attributes)
    return attributes;
  }
  
  private createContentValue(
    parent: FormGroup<{}>,
    field: string
  ): PageAttributeEntity {
    const group = parent.get(field);
    return {
      content: group?.get('value')?.value as unknown as string,
      type: group?.get('type')?.value as unknown as PageAttributeTypeEntity
    };
  }

  private createMediaValue(
    parent: FormGroup<{}>,
    field: string
  ): PageAttributeEntity {
    const group = parent.get(field);
    return {
      references: (group?.get('value')?.value as unknown as MediaEntity[]).map(media => ({
        media
      })),
      type: group?.get('type')?.value as unknown as PageAttributeTypeEntity
    }
  }

  private createPluginValue(): PageAttributeEntity {
    const group = this.form.controls.plugin.get('plugin');
    return         {
      references: [
        {
          plugin: {
            id: group?.get('value')?.value as unknown as string
          }
        }
      ],
      type: group?.get('type')?.value as unknown as PageAttributeTypeEntity
    }
  }
}
