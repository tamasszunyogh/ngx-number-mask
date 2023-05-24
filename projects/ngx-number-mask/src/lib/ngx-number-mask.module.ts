import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NUMBER_MASK_CONFIG,
  NgxNumberMaskConfig,
} from './ngx-number-mask.config';
import { NgxNumberMaskDirective } from './ngx-number-mask.directive';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NgxNumberMaskDirective],
  exports: [NgxNumberMaskDirective],
})
export class NgxNumberMaskModule {
  static forRoot(
    config: NgxNumberMaskConfig
  ): ModuleWithProviders<NgxNumberMaskModule> {
    return {
      ngModule: NgxNumberMaskModule,
      providers: [
        {
          provide: NUMBER_MASK_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
