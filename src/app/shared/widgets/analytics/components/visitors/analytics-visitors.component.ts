import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Store } from '@ngrx/store';
import { Maybe } from 'graphql/jsutils/Maybe';
import { AnalyticsDto, IntervalFilter } from 'src/app/core/api/generated/schema';
import { visitorsKey, visitsKey } from 'src/app/core/constants/analytics.constant';
import { CoreModule } from 'src/app/core/core.module';
import { CoreActions } from 'src/app/core/state/actions/core.actions';
import { Help } from 'src/app/core/typings/help';
import { Period } from 'src/app/core/typings/period';
import { DateRangeFilterComponent } from 'src/app/shared/filter/date-range/date-range-filter.component';
import { IntervalFilterComponent } from 'src/app/shared/filter/interval/interval-filter.component';
import { ChartModule } from '../../../chart/chart.module';
import { AnalyticsParams } from '../../typings/analytics';

@Component({
  selector: 'app-analytics-visitors',
  templateUrl: './analytics-visitors.component.html',
  styleUrls: ['./analytics-visitors.component.scss'],
  standalone: true,
  imports: [
    ChartModule,
    CommonModule,
    CoreModule,
    DateRangeFilterComponent,
    IntervalFilterComponent,
  ]
})
export class AnalyticsVisitorsComponent implements OnInit {

  @Input({ required: true })
  public set data(data: Maybe<AnalyticsDto[]>) {
    data?.forEach(statistic => {
      switch (statistic.name) {
        case visitsKey:
          this.visits = statistic;
          break;
        case visitorsKey:
          this.visitors = statistic;
          break;
      }
    })
  }

  @Input()
  public period: Period = {
    startDate: new Date(new Date().getFullYear(), 0, 1, 12),
    endDate: new Date()
  };

  @Input()
  public interval = IntervalFilter.Monthly;

  @Output()
  public params = new EventEmitter<AnalyticsParams>();

  public helpAction = {
    label: 'help',
    icon: ['far', 'circle-question'] as IconProp,
  };

  public visits?: AnalyticsDto;
  public visitsColor = '--color-primary-200';
  public visitsKey = visitsKey;
  public visitsAction = {
    ...this.helpAction, clicked: () => this.openHelp(this.visitsKey)
  };

  public visitors?: AnalyticsDto;
  public visitorsColor = '--color-accent-200';
  public visitorsKey = visitorsKey;
  public visitorsAction = {
    ...this.helpAction, clicked: () => this.openHelp(this.visitorsKey)
  }

  constructor(
    private store: Store) { }

  public ngOnInit(): void {
    this.emit();
  }

  public updatePeriod(period: Period): void {
    this.period = period;
    this.emit();
  }

  public updateInterval(interval: IntervalFilter): void {
    this.interval = interval;
    this.emit();
  }

  private emit(): void {
    this.params.emit({
      interval: this.interval,
      period: this.period
    });
  }

  private openHelp(statisicsKey: Maybe<string>): void {
    switch (statisicsKey) {
      case visitsKey:
        this.dispatch({
          titleLabel: 'visitsHelpTitle',
          contentLabel: 'visitsHelpDescription'
        });
        break;
      case visitorsKey:
        this.dispatch({
          titleLabel: 'visitorsHelpTitle',
          contentLabel: 'visitorsHelpDescription'
        });
        break;
    }
  }

  private dispatch(help: Help): void {
    this.store.dispatch(CoreActions.setHelp(help));
  }
}