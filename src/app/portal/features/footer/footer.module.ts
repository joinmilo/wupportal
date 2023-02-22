import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from 'src/app/core/core.module';
import { PortalFooterComponent } from './components/footer.component';
import { footerFeatureKey } from './constants/footer.constants';
import { FooterEffects } from './state/footer.effects';
import { footerReducer } from './state/footer.reducer';

const components: Type<any>[] = [
  PortalFooterComponent,
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