import { Component } from '@angular/core';
import { accountUrl } from 'src/app/core/constants/core.constants';

@Component({
  selector: 'app-portal-guest-article-success',
  templateUrl: './portal-guest-article-success.component.html',
  styleUrls: ['./portal-guest-article-success.component.scss'],
})
export class PortalGuestArticleSuccessComponent {

  public accountUrl = accountUrl;
}

