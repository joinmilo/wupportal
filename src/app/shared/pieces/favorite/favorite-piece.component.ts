import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { Maybe } from 'src/app/core/api/generated/schema';
import { CoreModule } from 'src/app/core/core.module';
import { ContentData, ContentEntity } from 'src/app/core/typings/content-entity';

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
export class FavoritePieceComponent implements OnInit {

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

  public ngOnInit(): void {
    // this.store.select();
  }

  public changeFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

}
