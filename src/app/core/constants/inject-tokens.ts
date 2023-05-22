import { InjectionToken } from '@angular/core';
import { TokenDto } from 'src/schema/schema';

export const APP_REFRESH = new InjectionToken<TokenDto>('app-refresh');