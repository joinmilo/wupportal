import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IconSize } from './icon';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  
  @Input()
  public color = '';
  
  @Input()
  public icon?: string;
  
  @Input()
  public size?: IconSize | string;

  @ViewChild('span') span?: ElementRef;

  public styles(): { [klass: string]: boolean; } {
    return {
      [this.size as string]: true,
      [this.color]: true,
    };
  }
}
    