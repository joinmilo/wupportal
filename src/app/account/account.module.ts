import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { PortalFooterModule } from '../portal/shared/footer/portal-footer.module';
import { CaptchaModule } from '../shared/captcha/captcha.module';
import { PrivacyPolicyFormComponent } from '../shared/form/privacy-policy/privacy-policy-form.component';
import { LoadingComponent } from '../shared/loading/loading.component';
import { PasswordModule } from '../shared/password/password.module';
import { TitleModule } from '../shared/title/title.module';
import { UserPortalRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { LoginRequiredComponent } from './components/login-required/login-required.component';
import { LoginComponent } from './components/login/login.component';
import { PasswordSendMailComponent } from './components/password-send-mail/password-send-mail.component';
import { PasswordSetNewComponent } from './components/password-set-new/password-set-new.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { VerificationSendMailComponent } from './components/verification-send-mail/verification-send-mail.component';
import { VerificationComponent } from './components/verification/verification.component';
import { accountFeatureKey } from './constants/account.constants';
import { AccountEffects } from './state/account.effects';
import { accountReducer } from './state/account.reducer';

const components = [
  ImageSliderComponent,
  LoginComponent,
  LoginRequiredComponent,
  PasswordSetNewComponent,
  PasswordSendMailComponent,
  RegistrationComponent,
  AccountComponent,
  VerificationComponent,
  VerificationSendMailComponent,
];

const framework = [
  CommonModule,
  ReactiveFormsModule,
];

const materials = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatButtonToggleModule,
];

const modules = [
  CaptchaModule,
  CoreModule,
  PasswordModule,
  PortalFooterModule,
  PrivacyPolicyFormComponent,
  TitleModule,
  UserPortalRoutingModule,

  LoadingComponent,
];

const libs = [
  FontAwesomeModule,
  StoreModule.forFeature(accountFeatureKey, accountReducer),
  EffectsModule.forFeature([AccountEffects]),
]

@NgModule({
  declarations: [...components],
  imports: [
    ...materials,
    ...framework,
    ...modules,
    ...libs,
  ],
  exports: [...components],
})
export class AccountModule { }