import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Maybe, PageAttributeEntity, PageEmbeddingEntity } from 'src/app/core/api/generated/schema';
import { TranslationService } from 'src/app/core/services/translation.service';

@Component({
  selector: 'app-admin-settings-page-embedding-expansion',
  templateUrl: './admin-settings-page-embedding-expansion.component.html',
  styleUrls: ['./admin-settings-page-embedding-expansion.component.scss'],
})
export class AdminSettingsPageEmbeddingExpansionComponent implements OnInit {

  @Input()
  public embedding?: PageEmbeddingEntity;

  @Output()
  public saved = new EventEmitter<PageEmbeddingEntity>();

  public form = this.fb.group({
    id: ['' as Maybe<string>],
    button: ['' as Maybe<string>],
    label: ['', [Validators.required]],
    text: ['' as Maybe<string>],
    title: ['' as Maybe<string>],
  });

  constructor(
    private fb: FormBuilder,
    private translationService: TranslationService,
  ) { }

  public ngOnInit(): void {
    this.form.patchValue({
      id: this.embedding?.id,
      label: this.embedding?.label,
    });

    this.patchContentValue('button');
    this.patchContentValue('title');
    this.patchContentValue('text');
  }
  
  private patchContentValue(field: string): void {
    const attribute = this.embedding?.attributes?.find(attribute => attribute?.type?.code === field)

    attribute?.content
      ? this.form.patchValue({
          [field]: attribute.content
        })
      : this.translationService.translatable(attribute, 'content')
        .pipe(take(1))
        .subscribe(content => this.form.patchValue({
          [field]: content
        }));
  }

  public update(): void {
    this.saved.emit({
      id: this.form.value.id,
      label: this.form.value.label,
      type: {
        id: this.embedding?.type?.id,
        code: this.embedding?.type?.code
      },
      attributes: [
        this.createContentValue('button'),
        this.createContentValue('title'),
        this.createContentValue('text'),
      ]
    })
  }

  private createContentValue(field: string): Maybe<PageAttributeEntity> {
    const attribute = this.embedding?.attributes?.find(attribute => attribute?.type?.code === field);
    return {
      content: (this.form.value as { [key: string]: string })[field],
      type: {
        id: attribute?.type?.id,
        code: attribute?.type?.code,
      }
    };
  }

}