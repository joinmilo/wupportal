import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEmbeddingEntity } from 'src/app/core/api/generated/schema';

@Component({
  selector: 'app-admin-settings-page-embedding-form',
  templateUrl: './admin-settings-page-embedding-form.component.html',
  styleUrls: ['./admin-settings-page-embedding-form.component.scss'],
})
export class AdminSettingsPageEmbeddingFormComponent {
  
  @Input({ required: true })
  public embedding?: PageEmbeddingEntity;

  @Output()
  public saved = new EventEmitter<PageEmbeddingEntity>();

}