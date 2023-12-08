import { DragDropDirective } from '../directive/drag-drop.directive';

export interface DragDropElement {
  directive: DragDropDirective,
  initIndex: number,
  expanded?: boolean
}