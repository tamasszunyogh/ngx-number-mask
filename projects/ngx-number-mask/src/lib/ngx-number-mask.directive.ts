/*
 * @Author: Zhenxiang Chen
 * @Date:   2021-05-10 22:49:09
 * @Last Modified by:   Zhenxiang Chen
 * @Last Modified time: 2021-05-10 22:58:03
 */
import {
  AfterViewInit,
  Directive,
  DoCheck,
  ElementRef,
  forwardRef,
  HostListener,
  Inject,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
  Optional,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  NumberMaskInputMode,
  NUMBER_MASK_CONFIG,
  NgxNumberMaskConfig,
} from './ngx-number-mask.config';
import { InputHandler } from './input.handler';

export const NUMBERMASKDIRECTIVE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgxNumberMaskDirective),
  multi: true,
};

@Directive({
  selector: '[numberMask]',
  providers: [NUMBERMASKDIRECTIVE_VALUE_ACCESSOR],
})
export class NgxNumberMaskDirective
  implements AfterViewInit, ControlValueAccessor, DoCheck, OnInit
{
  @Input() options: Partial<NgxNumberMaskConfig> = {};

  public inputHandler: InputHandler;
  public keyValueDiffer: KeyValueDiffer<any, any>;

  public optionsTemplate: NgxNumberMaskConfig = {
    align: 'right',
    allowNegative: false,
    allowZero: true,
    decimal: '.',
    decimalReplace: ',',
    precision: 2,
    prefix: '',
    suffix: '',
    thousands: ' ',
    nullable: true,
    inputMode: NumberMaskInputMode.NATURAL,
  };

  constructor(
    @Optional() @Inject(NUMBER_MASK_CONFIG) private numberMaskConfig: NgxNumberMaskConfig,
    private elementRef: ElementRef,
    private keyValueDiffers: KeyValueDiffers
  ) {
    if (numberMaskConfig) {
      this.optionsTemplate = numberMaskConfig;
    }

    this.keyValueDiffer = keyValueDiffers.find({}).create();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.setAttribute('inputmode', 'decimal');
    this.elementRef.nativeElement.setAttribute('pattern', '[0-9]*');
    this.elementRef.nativeElement.style.textAlign =
      this.options && this.options.align
        ? this.options.align
        : this.optionsTemplate.align;
  }

  ngDoCheck() {
    if (this.keyValueDiffer.diff(this.options)) {
      this.elementRef.nativeElement.style.textAlign = this.options.align
        ? this.options.align
        : this.optionsTemplate.align;
      this.inputHandler.updateOptions(
        (<any>Object).assign({}, this.optionsTemplate, this.options)
      );
    }
  }

  ngOnInit() {
    this.inputHandler = new InputHandler(
      this.elementRef.nativeElement,
      (<any>Object).assign({}, this.optionsTemplate, this.options)
    );
  }

  @HostListener('focus', ['$event'])
  handleFocus(event: any) {
    this.inputHandler.handleFocus();
  }

  @HostListener('blur', ['$event'])
  handleBlur(event: any) {
    this.inputHandler.getOnModelTouched()(event);
  }

  @HostListener('cut', ['$event'])
  handleCut(event: any) {
    if (!this.isChromeAndroid()) {
      !this.isReadOnly() && this.inputHandler.handleCut(event);
    }
  }

  @HostListener('input', ['$event'])
  handleInput(event: any) {
    if (this.isChromeAndroid()) {
      !this.isReadOnly() && this.inputHandler.handleInput(event);
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeydown(event: any) {
    if (!this.isChromeAndroid()) {
      !this.isReadOnly() && this.inputHandler.handleKeydown(event);
    }
  }

  @HostListener('keypress', ['$event'])
  handleKeypress(event: any) {
    if (!this.isChromeAndroid()) {
      !this.isReadOnly() && this.inputHandler.handleKeypress(event);
    }
  }

  @HostListener('paste', ['$event'])
  handlePaste(event: any) {
    if (!this.isChromeAndroid()) {
      !this.isReadOnly() && this.inputHandler.handlePaste(event);
    }
  }

  @HostListener('drop', ['$event'])
  handleDrop(event: any) {
    if (!this.isChromeAndroid()) {
      event.preventDefault();
    }
  }

  isChromeAndroid(): boolean {
    return (
      /chrome/i.test(navigator.userAgent) &&
      /android/i.test(navigator.userAgent)
    );
  }

  isReadOnly(): boolean {
    return this.elementRef.nativeElement.hasAttribute('readonly');
  }

  registerOnChange(callbackFunction: (value: any) => void): void {
    this.inputHandler.setOnModelChange(callbackFunction);
  }

  registerOnTouched(callbackFunction: (value: any) => void): void {
    this.inputHandler.setOnModelTouched(callbackFunction);
  }

  setDisabledState(value: boolean): void {
    this.elementRef.nativeElement.disabled = value;
  }

  writeValue(value: number): void {
    this.inputHandler.setValue(value);
  }
}
