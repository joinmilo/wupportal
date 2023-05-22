/* eslint-disable @typescript-eslint/no-explicit-any */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { enableProdMode } from '@angular/core';
import { FetchResult } from '@apollo/client/core';
import { AppModule } from './app/app.module';
import { graphqlApi, refreshKey } from './app/core/constants/core.constants';
import { APP_AUTH_TOKENS } from './app/core/constants/inject-tokens';
import { environment } from './environments/environment';
import { RefreshMutation } from './schema/schema';


// There is no way to use APP_INITIALIZER for initializing tokens 

function configListener(response: any) {
  try {
    const token = JSON.parse(response.target.responseText) as FetchResult<RefreshMutation>;

    if (!token?.data?.refreshToken) {
      localStorage.removeItem(refreshKey);
    }
    
    platformBrowserDynamic([
      { provide: APP_AUTH_TOKENS, useValue: token?.data?.refreshToken }
    ])
      .bootstrapModule(AppModule)
      .catch(err => console.error(err));  

  } catch (error) {
    console.error(error);
  }
}

function configFailed() {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err)); 
}

if (environment.production) {
  enableProdMode();
}

const request = new XMLHttpRequest();
request.addEventListener('load', configListener);
request.addEventListener('error', configFailed);
request.open('POST', new URL(graphqlApi).href);
request.setRequestHeader('Content-Type', 'application/json');
request.send(JSON.stringify({
  operationName: 'refresh',
  variables: {
    refreshToken: localStorage.getItem(refreshKey)
  },
  query: 'mutation refresh($refreshToken: String!) {\n  refreshToken(refreshToken: $refreshToken) {\n    access\n    refresh\n  }\n}'
}));
