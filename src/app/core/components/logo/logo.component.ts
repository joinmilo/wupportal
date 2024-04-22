import { Component, HostListener, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { logoConfig, logoTextConfig } from '../../constants/configuration.constants';
import { selectConfiguration } from '../../state/selectors/core.selectors';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

  @Input()
  public url?: string[] = ['/'];

  @Input()
  public showIconText = true;

  public logoConfig = this.store.select(selectConfiguration(logoConfig)); 

  public logoTextConfig = this.store.select(selectConfiguration(logoTextConfig)); 

  constructor(
    private store: Store,
  ) { }

  @HostListener('window:scroll', ['$event'])
  public onScroll(): void {
    this.showIconText = window?.scrollY === 0;
  }
  
}
