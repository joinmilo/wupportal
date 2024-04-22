import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilterService } from 'ngx-cinlib/filters';
import { Subject, takeUntil } from 'rxjs';
import { Maybe } from 'src/app/core/api/generated/schema';
import { SurveyFilterQueryDefinition } from 'src/app/core/typings/filter-params/survey-filter-param';

@Component({
  selector: 'app-survey-filter-past',
  templateUrl: './survey-filter-past.component.html',
  styleUrls: ['./survey-filter-past.component.scss']
})
export class SurveyFilterPastComponent implements OnInit, OnDestroy {

  @Input()
  public queryParamKey = SurveyFilterQueryDefinition.past;

  @Output()
  public valueChanged = new EventEmitter<Maybe<boolean> | undefined>();

  public control = new FormControl();

  private destroy = new Subject<void>();

  constructor(
    private filterService: FilterService,
  ) {
    this.watchValueChange();
  }

  public ngOnInit(): void {
    this.filterService.queryParams()
      .pipe(takeUntil(this.destroy))
      .subscribe(params => {
        const value = params?.[this.queryParamKey];
        this.control.setValue(value, {
          emitEvent: false,
        });
      });
  }

  private watchValueChange(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe((value: boolean) => {
        this.valueChanged.emit(value);
        this.filterService.updateParam(this.queryParamKey, value);
      });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
  
}
