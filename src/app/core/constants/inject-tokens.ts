import { InjectionToken } from '@angular/core';
import { TokenDto } from 'src/schema/schema';

export const APP_AUTH_TOKENS = new InjectionToken<TokenDto>('app-auth-tokens');