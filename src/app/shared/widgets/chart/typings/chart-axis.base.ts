import { Directive, Input, OnChanges, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Observable, Subject, isObservable, takeUntil } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation.service';
import { selectChartDefaultColors } from 'src/app/core/state/selectors/core.selectors';
import { ChartAction } from './chart-actions';

@Directive()
export abstract class AxisChart implements OnChanges, OnDestroy {

  @Input()
  public actions?: ChartAction[];

  @Input()
  public set colors(colors: string[]) {
    this.schemeCustom = { ...this.schemeDefault,
      domain: colors.map(color => color.startsWith('--')
        ? getComputedStyle(document.documentElement)
          .getPropertyValue(color as string)
        : color
      )
    };
  }
  
  @Input()
  public set data(data: Observable<unknown> | unknown) {
    isObservable(data)
      ? data
        .pipe(takeUntil(this.destroy))
        .subscribe(results => this.results = results)
      : (this.results = data);
  }

  @Input()
  public showGridLines = false;

  @Input()
  public set xAxisLabel(label: string) {
    this.translationService.label(label)
      .subscribe(translation => {
        if (translation) {
          this._xAxisLabel = translation;
        }
      })
  }

  public _xAxisLabel = '';

  @Input()
  public set yAxisLabel(label: string) {
    this.translationService.label(label)
      .subscribe(translation => {
        if (translation) {
          this._yAxisLabel = translation;
        }
      })
  }

  @Input()
  public _yAxisLabel = '';

  @Input()
  public titleLabel?: string;

  @Input()
  public title?: string;

  @Input()
  public xAxis = true;

  @Input()
  public yAxis = true;

  public get scheme(): Color {
    return this.schemeCustom ?? this.schemeDefault;
  }

  public schemeCustom?: Color;

  public schemeDefault: Color = {
    group: ScaleType.Time,
    name: 'colors',
    selectable: true,
    domain: []
  };

  public showXAxisLabel = false;

  public showYAxisLabel = false;

  public results: unknown;

  protected destroy = new Subject<void>();

  constructor(
    protected store: Store,
    protected translationService: TranslationService) {
      this.store.select(selectChartDefaultColors)
        .subscribe(defaultColors => {
          if (defaultColors) {
            this.schemeDefault = {
              ...this.schemeDefault, domain: defaultColors,
            };
          }
        })
  }

  public ngOnChanges(): void {
    this.showXAxisLabel = !!this._xAxisLabel;
    this.showYAxisLabel = !!this._yAxisLabel;
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

}