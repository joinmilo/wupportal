import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Maybe, PageEmbeddingEntity, PageEmbeddingTypeEntity } from 'src/app/core/api/generated/schema';
import { TranslationService } from 'src/app/core/services/translation.service';
import { AdminSettingsPageEmbeddingActions } from '../state/admin-settings-page-embedding.actions';
import { AdminSettingsPageEmbeddingDialogComponent } from './dialog/admin-settings-page-embedding-dialog.component';

type PageEmbeddingFormInput = {
  embedding: PageEmbeddingEntity,
  expanded?: boolean
};

@Component({
  selector: 'app-admin-settings-page-embedding',
  templateUrl: './admin-settings-page-embedding.component.html',
  styleUrls: ['./admin-settings-page-embedding.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AdminSettingsPageEmbeddingComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: AdminSettingsPageEmbeddingComponent
    },
  ],
})
export class AdminSettingsPageEmbeddingComponent implements ControlValueAccessor, Validator, OnDestroy {

  public disabled?: boolean;

  public inputs: PageEmbeddingFormInput[] = [];

  public valids: boolean[] = [];

  private onChange?: (embeddings: Maybe<PageEmbeddingEntity[]>) => void;
  private onTouch?: () => void;
  private onValidate?: () => void;

  private destroy = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private store: Store,
    private translationService: TranslationService,
  ) {
    this.store.dispatch(AdminSettingsPageEmbeddingActions.getPlugins());
  }

  public added(): void {
    this.dialog.open(AdminSettingsPageEmbeddingDialogComponent)
      .afterClosed()
      .pipe(takeUntil(this.destroy))
      .subscribe((embeddingType: PageEmbeddingTypeEntity) => {
        if (embeddingType) {
          this.inputs.push({
            expanded: true,
            embedding: {
              type: embeddingType,
              attributes: embeddingType.attributes?.map(attribute => ({
                type: {
                  id: attribute?.id,
                  code: attribute?.code
                }
              }))
            }
          });
          this.valids.push(false);
          this.cdr.detectChanges();
        }
      });
  }

  public deleted(index: number): void {
    this.inputs.splice(index, 1);
    this.valids.splice(index, 1);
    this.emit();
  }

  public sorted(indices: number[]): void {
    this.inputs = indices.map(sort => ({
      ...this.inputs[sort]
    }));

    this.valids = indices.map(sort => this.valids[sort]);
    
    this.emit();
  }

  public saved(embedding: PageEmbeddingEntity, index: number): void {
    this.inputs[index] = {
      embedding,
      expanded: false
    };
    this.emit();
  }

  private emit(): void {
    this.onTouch?.(); 
    this.onChange?.(
      this.inputs
        .map((input, order) => ({
          id: input.embedding.id,
          label: input.embedding.label,
          order,
          attributes: input.embedding.attributes?.map(attribute => ({
            id: attribute?.id,
            content: attribute?.content,
            references: attribute?.references?.map(reference => ({
              id: reference?.id,
              plugin: reference?.plugin?.id
                ? {
                    id: reference?.plugin?.id,
                  }
                : null,
              media: reference?.media
                ? reference?.media
                : null,
            })),
            type: {
              id: attribute?.type?.id,
            }
          })),
          type: {
            id: input.embedding.type?.id
          }
        }) as PageEmbeddingEntity)
    );
  }

  public validUpdated(valid: boolean, index: number) {
    this.valids[index] = valid;
    this.onValidate?.();
  }

  public get valid(): boolean {
    return this.valids.every(valid => valid)
  }

  public validate(): ValidationErrors | null {
    return !this.valid
      ? {
          pageEmbeddingInvalid: true,
        }
      : null;
  }

  public writeValue(value: Maybe<PageEmbeddingEntity[]>): void {
    if (value?.length) {
      this.inputs = value.sort((a, b) => (a.order as number) - (b.order as number))
        .map(embedding => ({
          embedding,
          expanded: false,
        }));
      this.cdr.detectChanges();
    }
  }

  public registerOnChange(onChange: (embeddings: Maybe<PageEmbeddingEntity[]>) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: () => void): void {
    this.onTouch = onTouch;
  }

  public registerOnValidatorChange?(onValidate: () => void): void {
    this.onValidate = onValidate;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}