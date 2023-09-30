import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface RadioButtonInput<T = unknown> {
  icon?: IconProp;
  label?: string;
  value?: T;
}