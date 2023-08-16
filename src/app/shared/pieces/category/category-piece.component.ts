import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { Category } from 'src/app/core/typings/category';
import { invertColor } from 'src/app/core/utils/color.utils';
import { Maybe } from 'src/schema/schema';

@Component({
  selector: 'app-category-piece',
  templateUrl: './category-piece.component.html',
  styleUrls: ['./category-piece.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,
  ]
})
export class CategoryPieceComponent {
  
  @Input()
  public category?: Maybe<Category>;
  
  @Input()
  public url?: Maybe<string[]>;
  
  @Input()
  public queryParam?: Maybe<string>;

  constructor(
    private router: Router,
  ) { }
  
  public styles(): { [klass: string]: unknown; } |null | undefined {
    const color = this.category?.color ?? '#B7B7B7';
    return {
      'background': color,
      'color': invertColor(color),
    }
  }

  public route(): void {
    if (this.url) {
      this.router.navigate(this.url, {
        queryParams: {
          [this.queryParam || '']: this.category?.id
        }
      });
    }
  }
}