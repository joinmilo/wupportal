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

  public updated(indices: number[]): void {
    this.embeddings = indices
      .map(index => this.embeddings[index])
      .map((embedding, order) => ({
        ...embedding, order
      }));
    this.onChange?.(this.embeddings);
  }

  public writeValue(value: Maybe<PageEmbeddingEntity[]>): void {
    if (value?.length) {
      this.embeddings = value;
      this.cdr.detectChanges();
    }
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