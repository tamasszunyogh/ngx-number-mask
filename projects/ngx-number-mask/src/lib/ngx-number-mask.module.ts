import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NUMBER_MASK_CONFIG,
  NgxNumberMaskConfig,
} from 'projects/ngx-number-mask/src/lib/ngx-number-mask.config';
import { NgxNumberMaskDirective } from 'projects/ngx-number-mask/src/lib/ngx-number-mask.directive';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NgxNumberMaskDirective],
  exports: [NgxNumberMaskDirective],
})
export class NumberMaskModule {
  static forRoot(
    config: NgxNumberMaskConfig
  ): ModuleWithProviders<NumberMaskModule> {
    return {
      ngModule: NumberMaskModule,
      providers: [
        {
          provide: NUMBER_MASK_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
