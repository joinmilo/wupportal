
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from 'src/app/core/core.module';
import { AddressPieceComponent } from '../../layout/address/address-piece.component';
import { CategoryPieceComponent } from '../../layout/category/category-piece.component';
import { DatePieceComponent } from '../../layout/date/date-piece.component';
import { MailPieceComponent } from '../../layout/mail/mail-piece.component';
import { PhonePieceComponent } from '../../layout/phone/phone-piece.component';
import { FavoriteComponent } from '../favorite/favorite.component';
import { MediaModule } from '../media/media.module';
import { ShareModule } from '../share/share.module';
import { CardActionsComponent } from './components/actions/card-actions.component';
import { ContactCardComponent } from './components/contact/contact-card.component';
import { ContentCardComponent } from './components/content/content-card.component';
import { MemberCardComponent } from './components/member/member-card.component';
import { SponsoredDesktopCardComponent } from './components/sponsored/desktop/sponsored-desktop-card.component';
import { SponsoredCardComponent } from './components/sponsored/sponsored-card.component';

const components = [
  CardActionsComponent,
  ContactCardComponent,
  ContentCardComponent,
  SponsoredCardComponent,
  SponsoredDesktopCardComponent,
  MemberCardComponent,
];

const framework = [
  CommonModule,
  RouterModule,
];

const materials = [
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatMenuModule,
  ShareModule,
];

const modules = [
  AddressPieceComponent,
  CategoryPieceComponent,
  CoreModule,
  DatePieceComponent,
  FavoriteComponent,
  MailPieceComponent,
  MediaModule,
  PhonePieceComponent,
];

const libs = [
  FontAwesomeModule,
]

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...materials,
    ...modules,
    ...libs,
  ],
  exports: [...components],
})
export class CardModule { }
