import { Component, Input, OnInit } from '@angular/core';
import { Maybe } from 'src/app/core/api/generated/schema';
import { ContentData, ContentEntity } from 'src/app/core/typings/content-entity';
import { CardElement } from '../../typings/card';
import { dataToElement } from '../../utils/card.utils';
@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {

  @Input()
  public entity?: Maybe<ContentEntity>;

  @Input()
  public data?: Maybe<ContentData>;

  public element?: Maybe<CardElement>;

  public ngOnInit(): void {
    if (this.entity && this.data) {
      this.element = dataToElement(this.entity, this.data);
    }
  }
}
