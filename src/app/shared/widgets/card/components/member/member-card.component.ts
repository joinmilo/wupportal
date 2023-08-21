import { Component, Input, OnInit } from '@angular/core';
import { ContentData, ContentEntity } from 'src/app/core/typings/content-entity';
import { Maybe } from 'src/schema/schema';
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
