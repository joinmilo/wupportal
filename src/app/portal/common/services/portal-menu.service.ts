import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Maybe, MenuItemEntity } from 'src/schema/schema';

@Injectable({ providedIn: CommonModule })
export class PortalMenuService {

  constructor(
    private router: Router,
  ) { }

  public route(item: Maybe<MenuItemEntity>): void {
    if (item?.feature?.key) {
      this.router.navigate([`/${item.feature.key}`]);
    }

    if (item?.page?.slug) {
      this.router.navigate([`/${item.page.slug}`]);
    }
  }

}
