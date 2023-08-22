import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { ContentData, ContentEntity } from 'src/app/core/typings/content-entity';
import { Maybe } from 'src/schema/schema';

@Component({
  selector: 'app-favorite-piece',
  templateUrl: './favorite-piece.component.html',
  styleUrls: ['./favorite-piece.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,
    FontAwesomeModule,
    MatButtonModule,
  ]
})
export class FavoritePieceComponent {

  @Input({ required: true })
  public entity?: Maybe<ContentEntity>;

  @Input({ required: true })
  public data?: Maybe<ContentData>;

  @Input()
  public withLabel = false;

  isFavorite = false;

  constructor(
    private store: Store,
  ) { }

  public changeFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

}
