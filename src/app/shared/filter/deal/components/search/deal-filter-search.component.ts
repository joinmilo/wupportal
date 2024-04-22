import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilterService } from 'ngx-cinlib/filters';
import { Subject, takeUntil } from 'rxjs';
import { Maybe } from 'src/app/core/api/generated/schema';
import { DealFilterQueryDefinition } from 'src/app/core/typings/filter-params/deal-filter-param';

@Component({
  selector: 'app-deal-filter-search',
  templateUrl: './deal-filter-search.component.html',
  styleUrls: ['./deal-filter-search.component.scss']
})
export class DealFilterSearchComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public disabled?: Maybe<boolean>;
  
  @Input()
  public queryParamKey = DealFilterQueryDefinition.searchOnly;

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
  
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled']) {
      this.disabled
        ? this.control.disable()
        : this.control.enable();
    }
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
