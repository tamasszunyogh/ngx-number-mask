import { InputService } from './input.service';
import { NgxNumberMaskConfig } from './ngx-number-mask.config';

export class InputHandler {
  private inputService: InputService;
  private onModelChange: (value: any) => void;
  private onModelTouched: (value: any) => void;

  constructor(private htmlInputElement: HTMLInputElement, private options: NgxNumberMaskConfig) {
    this.inputService = new InputService(htmlInputElement, options);
  }

  handleFocus() {
    if (this.options.startFromEnd) {
      setTimeout(() => this.inputService.inputManager.setCursorAt(this.htmlInputElement.value.length), 0);
    }
    if (this.options.selectOnFocus) {
      setTimeout(() => this.inputService.inputManager.select(), 0);
    }
  }

  handleCut(event: any): void {
    setTimeout(() => {
      this.inputService.updateFieldValue();
      this.setValue(this.inputService.value);
      this.onModelChange(this.inputService.value);
    }, 0);
  }

  handleInput(event: any): void {
    const selectionStart = this.inputService.inputSelection.selectionStart;
    const keyCode = this.inputService.rawValue.charCodeAt(selectionStart - 1);
    const rawValueLength = this.inputService.rawValue.length;
    const storedRawValueLength = this.inputService.storedRawValue.length;

    if (Math.abs(rawValueLength - storedRawValueLength) !== 1) {
      this.inputService.updateFieldValue(selectionStart);
      this.onModelChange(this.inputService.value);
      return;
    }

    // Restore the old value.
    this.inputService.rawValue = this.inputService.storedRawValue;

    if (rawValueLength < storedRawValueLength) {
      // Chrome Android seems to move the cursor in response to a backspace AFTER processing the
      // input event, so we need to wrap this in a timeout.
      this.timer(() => {
        // Move the cursor to just after the deleted value.
        this.inputService.updateFieldValue(selectionStart + 1);

        // Then backspace it.
        this.inputService.removeNumber(8);
        this.onModelChange(this.inputService.value);
      }, 0);
    }

    if (rawValueLength > storedRawValueLength) {
      // Move the cursor to just before the new value.
      this.inputService.updateFieldValue(selectionStart - 1);

      // Process the character like a keypress.
      this.handleKeypressImpl(keyCode);
    }
  }

  handleKeydown(event: any): void {
    const keyCode = event.which || event.charCode || event.keyCode;
    if (keyCode === 8 || keyCode === 46 || keyCode === 63272) {
      event.preventDefault();

      if (
        this.inputService.inputSelection.selectionStart <= this.inputService.prefixLength() &&
        this.inputService.inputSelection.selectionEnd >= this.inputService.rawValue.length - this.inputService.suffixLength()
      ) {
        this.clearValue();
      } else {
        this.inputService.removeNumber(keyCode);
        this.onModelChange(this.inputService.value);
      }
    }
  }

  clearValue() {
    this.setValue(this.inputService.isNullable() ? null : 0);
    this.onModelChange(this.inputService.value);
  }

  handleKeypress(event: any): void {
    const keyCode = event.which || event.charCode || event.keyCode;
    event.preventDefault();
    if (keyCode === 97 && event.ctrlKey) {
      return;
    }

    this.handleKeypressImpl(keyCode);
  }

  private handleKeypressImpl(keyCode: number): void {
    switch (keyCode) {
      case undefined:
      case 9:
      case 13:
        return;
      case 43:
        this.inputService.changeToPositive();
        break;
      case 45:
        this.inputService.changeToNegative();
        break;
      default:
        if (this.inputService.canInputMoreNumbers) {
          const selectionRangeLength = Math.abs(
            this.inputService.inputSelection.selectionEnd - this.inputService.inputSelection.selectionStart,
          );

          if (selectionRangeLength === this.inputService.rawValue.length) {
            this.setValue(null);
          }

          this.inputService.addNumber(keyCode);
        }
        break;
    }

    this.onModelChange(this.inputService.value);
  }

  handlePaste(event: any): void {
    setTimeout(() => {
      this.inputService.updateFieldValue();
      this.setValue(this.inputService.value);
      this.onModelChange(this.inputService.value);
    }, 1);
  }

  updateOptions(options: any): void {
    this.inputService.updateOptions(options);
  }

  getOnModelChange(): (value: any) => void {
    return this.onModelChange;
  }

  setOnModelChange(callbackFunction: (value: any) => void): void {
    this.onModelChange = callbackFunction;
  }

  getOnModelTouched(): (value: any) => void {
    return this.onModelTouched;
  }

  setOnModelTouched(callbackFunction: (value: any) => void) {
    this.onModelTouched = callbackFunction;
  }

  setValue(value: number): void {
    this.inputService.value = value;
  }

  /**
   * Passthrough to setTimeout that can be stubbed out in tests.
   */
  private timer(callback: () => void, delayMillis: number) {
    setTimeout(callback, delayMillis);
  }
}
