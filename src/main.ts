/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { enableProdMode } from '@angular/core';
import { FetchResult } from '@apollo/client/core';
import { AppModule } from './app/app.module';
import { graphqlApi, refreshKey } from './app/core/constants/core.constants';
import { APP_REFRESH } from './app/core/constants/inject-tokens';
import { environment } from './environments/environment';
import { RefreshMutation } from './schema/schema';

function configListener(response: any) {
  try {
    const token = JSON.parse(response.target.responseText) as FetchResult<RefreshMutation>;
    
    console.log('first!', token);

    token?.data?.refreshToken
    
    platformBrowserDynamic([
      { provide: APP_REFRESH, useValue: token?.data?.refreshToken }
    ])
      .bootstrapModule(AppModule)
      .catch(err => console.error(err));  

  } catch (error) {
    console.error(error);
  }
}

function configFailed(evt: any) {
  console.error('Error: retrieving config.json');
}

if (environment.production) {
  enableProdMode();
}

const refresh = {
  operationName: 'refresh',
  variables: {
    refreshToken: localStorage.getItem(refreshKey)
  },
  query: 'mutation refresh($refreshToken: String!) {\n  refreshToken(refreshToken: $refreshToken) {\n    access\n    refresh\n  }\n}'
}

const request = new XMLHttpRequest();
request.addEventListener('load', configListener);
request.addEventListener('error', configFailed);
request.open('POST', new URL(graphqlApi).href);
request.setRequestHeader('Content-Type', 'application/json');
request.send(JSON.stringify(refresh));
