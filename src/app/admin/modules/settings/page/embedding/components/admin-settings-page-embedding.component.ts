import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { Maybe, PageEmbeddingEntity, PageEmbeddingTypeEntity } from 'src/app/core/api/generated/schema';
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
    }
  ],
})
export class AdminSettingsPageEmbeddingComponent implements ControlValueAccessor, OnDestroy {

  public disabled?: boolean;

  //TODO: This is not good, use different mechanism via dynamic forms or similar strategies
  public disabledNewButton?: boolean;

  public inputs: PageEmbeddingFormInput[] = [];

  public sortedIndices?: number[];

  private onChange?: (embeddings: Maybe<PageEmbeddingEntity[]>) => void;
  private onTouch?: () => void;

  private destroy = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private store: Store,
  ) {
    this.store.dispatch(AdminSettingsPageEmbeddingActions.getPlugins());
  }

  public selectEmbedding(): void {
    this.dialog.open(AdminSettingsPageEmbeddingDialogComponent)
      .afterClosed()
      .pipe(takeUntil(this.destroy))
      .subscribe((embeddingType: PageEmbeddingTypeEntity) => {
        if (embeddingType) {
          this.inputs.push({
            expanded: true,
            embedding: {
              label: embeddingType.name,
              type: embeddingType,
              attributes: embeddingType.attributes?.map(attribute => ({
                type: {
                  id: attribute?.id,
                  code: attribute?.code
                }
              }))
            }
          });
          this.disabledNewButton = true;
          this.cdr.detectChanges();
        }
      });
  }

  public deleted(index: number): void {
    this.inputs.splice(index, 1);
    this.emit();
    this.disabledNewButton = false;
  }

  public sorted(indices: number[]): void {
    this.sortedIndices = indices;
    this.emit();
  }

  public saved(embedding: PageEmbeddingEntity, index: number): void {
    this.inputs[index] = {
      embedding,
      expanded: false
    };
    this.emit();
    this.disabledNewButton = false;
  }

  private emit(): void {
    const embeddings = this.sortedIndices?.length
      ? this.sortedIndices.map((sort, order) => ({
          ...this.inputs[sort].embedding, order
        }))
      : this.inputs.map((input, order) => ({
          ...input.embedding, order
        }));

    this.onTouch?.(); 
    this.onChange?.(
      embeddings.map(embedding => ({
        id: embedding.id,
        label: embedding.label,
        order: embedding.order,
        attributes: embedding.attributes?.map(attribute => ({
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
          id: embedding.type?.id
        }
      }) as PageEmbeddingEntity)
    );
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

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}