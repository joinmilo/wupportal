import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureEntity, Maybe, MenuItemEntity } from 'src/schema/schema';

@Injectable({ providedIn: CommonModule })
export class PortalMenuService {

  constructor(
    router: Router,
  ) { }


  public route(item: Maybe<MenuItemEntity>): void {
    if (item?.feature?.id) {
      return this.routeFeature(item?.feature);
    }
  }

  private routeFeature(feature: FeatureEntity): void {
  }


}
