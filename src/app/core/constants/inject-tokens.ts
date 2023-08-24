import { InjectionToken } from '@angular/core';
import { TokenDto } from 'src/app/core/api/generated/schema';

export const APP_AUTH_TOKENS = new InjectionToken<TokenDto>('app-auth-tokens');