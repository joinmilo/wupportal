import { IMAGE_LOADER, NgOptimizedImage } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FetchResult } from '@apollo/client/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RefreshMutation, TokenDto } from 'src/schema/schema';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { graphqlApi, mediaApi, refreshKey } from './core/constants/core.constants';
import { CoreModule } from './core/core.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { CustomImageLoader } from './core/typings/customImageLoader';
import { GraphQLModule } from './graphql.module';
import { PortalModule } from './portal/portal.module';

function init(httpService: HttpClient): () => Observable<unknown> {
  return () => httpService.post(new URL(graphqlApi).href, {
      operationName: "refresh",
      variables: {
        refreshToken: localStorage.getItem(refreshKey)
      },
      query: "mutation refresh($refreshToken: String!) {\n  refreshToken(refreshToken: $refreshToken) {\n    access\n    refresh\n  }\n}"
    }).pipe(
      tap(() => console.log('httpClient')),
      map((response: FetchResult<RefreshMutation>) => response.data?.refreshToken as TokenDto),
      // tap((tokens: TokenDto) => this.store(tokens)),
    );
}

const components = [
  AppComponent,
];

const framework = [
  AppRoutingModule,
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  RouterModule,
  NgOptimizedImage,
];

const libs = [
  GraphQLModule,
  StoreModule.forRoot({}, {}),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({
    logOnly: environment.production,
    autoPause: true,
  }),
];

//TODO: Breaks scrolling Angular:
// https://github.com/angular/angular/issues/35759
const materials = [
  MatAutocompleteModule,
  MatMenuModule,
];

const modules = [
  CoreModule,
  PortalModule
];

const providers = [
  // {
  //   provide: APP_INITIALIZER,
  //   useFactory: init,
  //   deps: [HttpClient],
  //   multi: true,
  // },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  },
  {
    provide: IMAGE_LOADER,
    useValue: (config: CustomImageLoader) => {
      return config.loaderParams?.src
        ? config.loaderParams.src
        : config.loaderParams && config.loaderParams.media && config.loaderParams.media.id
          ? mediaApi(config.loaderParams.media)
          : '/assets/placeholder.webp';
    }
  }
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...framework,
    ...libs,
    ...materials,
    ...modules,
  ],
  providers: [
    ...providers,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
