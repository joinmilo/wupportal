import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterAppStoreComponent } from 'src/app/shared/layout/footer/appstore/footer-appstore.component';
import { FooterSocialMediaComponent } from 'src/app/shared/layout/footer/socialmedia/footer-socialmedia.component';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,

    FooterAppStoreComponent,
    FooterSocialMediaComponent,
  ]
})
export class AdminFooterComponent {

  public get currentYear(): number {
    return new Date().getFullYear();
  }

}
