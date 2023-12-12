import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Maybe, PageEmbeddingEntity, PageEmbeddingTypeEntity } from 'src/app/core/api/generated/schema';
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
  public disabledNewButton?: boolean;

  public embeddings: PageEmbeddingFormInput[] = [];

  public sortedIndices?: number[];

  private onChange?: (embeddings: Maybe<PageEmbeddingEntity[]>) => void;
  private onTouch?: () => void;

  private destroy = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {}

  public selectEmbedding(): void {
    this.dialog.open(AdminSettingsPageEmbeddingDialogComponent)
      .afterClosed()
      .pipe(takeUntil(this.destroy))
      .subscribe((embeddingType: PageEmbeddingTypeEntity) => {
        if (embeddingType) {
          this.embeddings.push({
            expanded: true,
            embedding: {
              label: embeddingType.name,
              type: embeddingType,
              attributes: embeddingType.attributes?.map(attribute => ({
                type: {
                  id: attribute?.id
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
    this.embeddings.splice(index, 1);
    this.emit();
  }

  public sorted(indices: number[]): void {
    this.sortedIndices = indices;
    this.emit();
  }

  public saved(embedding: PageEmbeddingEntity, index: number): void {
    this.embeddings[index] = {
      embedding,
      expanded: false
    };
    this.emit();
    this.disabledNewButton = false;
  }

  private emit(): void {
    const embeddings = this.sortedIndices
      ? this.sortedIndices.map((sort, order) => ({
          ...this.embeddings[sort], order
        }))
      : this.embeddings.map((embedding, order) => ({
          ...embedding, order
        }));

    console.log(embeddings, this.sortedIndices);
    this.onTouch?.(); 
    this.onChange?.(embeddings);
  }

  public writeValue(value: Maybe<PageEmbeddingEntity[]>): void {
    if (value?.length) {
      this.embeddings = value.sort((a, b) => (a.order as number) - (b.order as number))
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