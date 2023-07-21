import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { slug } from 'src/app/core/constants/core.constants';
import { AccountActions } from '../../state/account.actions';
import { selectAccountVerified } from '../../state/account.selectors';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {
  
  public verified = this.store.select(selectAccountVerified);

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {}
  
  public ngOnInit(): void {
    this.route.paramMap.pipe(
      take(1),
      tap(params => this.store.dispatch(AccountActions.verify(params.get(slug))))
    ).subscribe();
  }
}
