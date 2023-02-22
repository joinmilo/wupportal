import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { PortalHeaderComponent } from '../../common/components/header/portal-header.component';
import { PortalMenuComponent } from '../../common/components/menu/portal-menu.component';
import { footerFeatureKey } from './constants/footer.constants';
import { FooterEffects } from './state/footer.effects';
import { footerReducer } from './state/footer.reducer';

const components: Type<any>[] = [
  PortalHeaderComponent,
  PortalMenuComponent
];

const framework: Type<any>[] = [
  CommonModule,
];

const materials: Type<any>[] = [
  MatToolbarModule,
];

const modules: Type<any>[] = [
  CoreModule,
];

@NgModule({
  declarations: [...components],
  imports: [
    ...framework,
    ...materials,
    ...modules,
    StoreModule.forFeature(footerFeatureKey, footerReducer),
    EffectsModule.forFeature([FooterEffects]),
  ],
  exports: [
    ...components,
  ],
})
export class PortalFooterModule { }