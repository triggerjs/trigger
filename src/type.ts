import { EdgeOptions } from './directives/tg-edge';
import { FilterValue } from './directives/tg-filter';
export type BezierOption = string | Array<number>
export type CssVariable = `--${string}`;
export type AttributeNumber = `${number}` | number;
export type Prefix = `${string}-`;
export type direction = 'vertical' | 'horizon';
export type CustomDirective<T extends string = string> = `${T}-${string}`;
export type TgDirective = CustomDirective<'tg'>;

export interface TgElement {
  el: HTMLElement;
  top: number;
  left: number;
  width: number;
  height: number;
  direction: direction;
  size: number;
  position: number;
  name: string;
  from: number;
  to: number;
  steps: number;
  step: number;
  mapping: Record<string, string>;
  filter: FilterValue;
  edge: EdgeOptions;
  range: number;
  increment: number;
  segments: number;
  decimals: number;
  multiplier: number;
  lastValue: string | number | null;
  bezier: string | Array<number>
}

export interface Trigger {
  start: () => void;
}

export interface TgElementExtraData {
  increment?: number;
  decimals?: number;
}
