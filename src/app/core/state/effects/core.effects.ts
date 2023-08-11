import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';

import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AppEntity, ConfigurationEntity, GetAppsGQL, GetConfigurationsGQL, GetLabelsGQL, GetLanguagesGQL, GetServerInformationGQL, GetSocialMediaGQL, GetThemeGQL, LabelEntity, LanguageEntity, SocialMediaEntity, ThemeEntity } from 'src/schema/schema';
import { FeedbackService } from '../../services/feedback.service';
import { CoreActions } from '../actions/core.actions';

import { Action } from '@ngrx/store';

@Injectable()
export class CoreEffects implements OnInitEffects {

  ngrxOnInitEffects(): Action {
    return CoreActions.init();
  }

  getApps = createEffect(() => this.actions.pipe(
    ofType(CoreActions.init),
    switchMap(() => this.getAppsService.watch().valueChanges),
    map(response => CoreActions.setApps(response.data.getApps?.result as AppEntity[]))
  ));

  getConfigurations = createEffect(() => this.actions.pipe(
    ofType(CoreActions.init),
    switchMap(() => this.getCofigurationsService.watch().valueChanges),
    filter(response => !!response.data.getConfigurations?.result?.length),
    map(response => CoreActions.setConfigurations(response.data.getConfigurations?.result as ConfigurationEntity[]))
  ));

  getLabels = createEffect(() => this.actions.pipe(
    ofType(CoreActions.init),
    switchMap(() => this.getLabelsService.watch().valueChanges),
    filter(response => !!response?.data?.getLabels?.result?.length),
    map(response => CoreActions.setLabels(response.data.getLabels?.result as LabelEntity[]))
  ));

  getLanguages = createEffect(() => this.actions.pipe(
    ofType(CoreActions.init),
    switchMap(() => this.getLanguagesService.watch({
      params: {
        expression: {
          entity: {
            path: 'active',
            value: 'true'
          }
        }
      }
    }).valueChanges),
    filter(response => !!response?.data?.getLanguages?.result?.length),
    map(response => CoreActions.setLanguages(response.data.getLanguages?.result as LanguageEntity[]))
  ));

  getServerInfo = createEffect(() => this.actions.pipe(
    ofType(CoreActions.init),
    switchMap(() => this.getServerInfoService.watch().valueChanges),
    filter(response => !!response?.data?.getInformation?.version),
    map(response => CoreActions.setServerInfo(response.data.getInformation))
  ));

  getSocialMedia = createEffect(() => this.actions.pipe(
    ofType(CoreActions.init),
    switchMap(() => this.getSocialMediaService.watch().valueChanges),
    map(response => CoreActions.setSocialMedia(response.data.getSocialMedias?.result as SocialMediaEntity[]))
  ));

  getTheme = createEffect(() => this.actions.pipe(
    ofType(CoreActions.init),
    switchMap(() => this.getThemeService.watch().valueChanges),
    filter(response => !!response?.data?.getThemes?.result?.length),
    map(response => CoreActions.setThemes(response.data.getThemes?.result as ThemeEntity[]))
  ));

  setFeedback = createEffect(() => this.actions.pipe(
    ofType(CoreActions.setFeedback),
    tap(action => this.feedbackService.open(action.feedback)),
  ), { dispatch: false });

  constructor(
    private actions: Actions,
    private feedbackService: FeedbackService,
    private getAppsService: GetAppsGQL,
    private getCofigurationsService: GetConfigurationsGQL,
    private getLabelsService: GetLabelsGQL,
    private getLanguagesService: GetLanguagesGQL,
    private getServerInfoService: GetServerInformationGQL,
    private getSocialMediaService: GetSocialMediaGQL,
    private getThemeService: GetThemeGQL,
    ) { }
}
