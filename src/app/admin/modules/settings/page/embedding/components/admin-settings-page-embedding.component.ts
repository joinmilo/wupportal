import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Maybe, PageEmbeddingEntity, PageEmbeddingTypeEntity } from 'src/app/core/api/generated/schema';
import { AdminSettingsPageEmbeddingDialogComponent } from './dialog/admin-settings-page-embedding-dialog.component';

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

  public embeddings: PageEmbeddingEntity[] = [];

  public sortedIndices?: number[];

  private onChange?: (embeddings: Maybe<PageEmbeddingEntity[]>) => void;

  private destroy = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  public selectEmbedding(): void {
    this.dialog.open(AdminSettingsPageEmbeddingDialogComponent)
      .afterClosed()
      .pipe(takeUntil(this.destroy))
      .subscribe((embeddingType: PageEmbeddingTypeEntity) => {
        if (embeddingType) {
          this.embeddings.push({
            label: embeddingType.name,
            type: embeddingType,
            attributes: embeddingType.attributes?.map(attribute => ({
              type: {
                id: attribute?.id
              }
            }))
          });
          this.cdr.detectChanges();
        }
      });
  }

  public deleted(index: number): void {
    this.embeddings.splice(index, 1);
  }

  public sorted(indices: number[]): void {
    this.sortedIndices = indices;
    this.emit();
  }

  public saved(embedding: PageEmbeddingEntity, index: number): void {
    this.embeddings[index] = embedding;
    this.emit();
  }

  public writeValue(value: Maybe<PageEmbeddingEntity[]>): void {
    if (value?.length) {
      this.embeddings = value;
      this.cdr.detectChanges();
    }
  }

  private emit(): void {
    console.log('tessst', this.sortedIndices, this.embeddings);
    const embeddings = this.sortedIndices
      ? this.sortedIndices.map(order => ({
          ...this.embeddings[order], order
        }))
      : this.embeddings.map((embedding, order) => ({
          ...embedding, order
        }));

    this.onChange?.(embeddings);
  }

  public registerOnChange(onChange: (embeddings: Maybe<PageEmbeddingEntity[]>) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(): void {
    return;
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}