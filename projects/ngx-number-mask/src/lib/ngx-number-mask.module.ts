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
export class NgxNumberModule {
  static forRoot(
    config: NgxNumberMaskConfig
  ): ModuleWithProviders<NgxNumberModule> {
    return {
      ngModule: NgxNumberModule,
      providers: [
        {
          provide: NUMBER_MASK_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
