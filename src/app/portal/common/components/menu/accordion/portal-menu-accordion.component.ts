import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Store } from '@ngrx/store';
import { Maybe, MenuItemEntity } from 'src/schema/schema';
import { CommonActions } from '../../../state/common.actions';
import { selectMenu } from '../../../state/common.selectors';

@Component({
  selector: 'app-portal-menu-accordion',
  templateUrl: './portal-menu-accordion.component.html',
  styleUrls: ['./portal-menu-accordion.component.scss']
})
export class PortalMenuAccordionComponent {

  @Input()
  public boldTitle = false;

  @Output()
  public itemSelected = new EventEmitter<Maybe<MenuItemEntity>>();

  public menu = this.store.select(selectMenu);

  @ViewChild(MatAccordion, {static: true})
  private panel?: MatAccordion;

  constructor(
    private store: Store,
  ) { }
  
  public navigate(item: Maybe<MenuItemEntity>) {
    this.itemSelected.emit(item);
    this.panel?.closeAll();
    this.store.dispatch(CommonActions.navigateMenu(item));
  }
}
