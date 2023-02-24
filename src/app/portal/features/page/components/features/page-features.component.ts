import { Component, Input, OnInit } from '@angular/core';
import { Maybe, PageFeatureEntity } from 'src/schema/schema';
import { eventFeatureKey } from '../../constants/page.constants';

@Component({
  selector: 'app-page-features',
  templateUrl: './page-features.component.html',
  styleUrls: ['./page-features.component.scss']
})
export class PageFeaturesComponent implements OnInit {

  @Input()
  public features?: Maybe<Maybe<PageFeatureEntity>[]>

  public eventFeatureKey = eventFeatureKey;

  ngOnInit(): void {
    this.features?.sort((f1, f2) => (f2?.order || 0) - (f1?.order || 0));
  }

}
