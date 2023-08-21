import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from 'src/app/core/core.module';

@Component({
  selector: 'app-favorite-piece',
  templateUrl: './favorite-piece.component.html',
  styleUrls: ['./favorite-piece.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,
    FontAwesomeModule,
  ]
})
export class FavoritePieceComponent<T> {

  @Input()
  public entity?: T;

  @Input()
  public withLabel = false;

  isFavorite = false;

  public changeFavorite() {
    this.isFavorite = !this.isFavorite;
  }

}
