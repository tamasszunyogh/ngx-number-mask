import { InjectionToken } from '@angular/core';

export interface NgxNumberMaskConfig {
  align: string;
  allowNegative: boolean;
  allowZero: boolean;
  decimal: string;
  decimalReplace: string;
  precision: number;
  prefix: string;
  suffix: string;
  thousands: string;
  nullable: boolean;
  min?: number;
  max?: number;
  startFromEnd?: boolean;
  inputMode?: NumberMaskInputMode;
}

export enum NumberMaskInputMode {
  FINANCIAL,
  NATURAL,
}

export const NUMBER_MASK_CONFIG = new InjectionToken<NgxNumberMaskConfig>(
  'ngx.number.mask.config'
);
