# ng2-number-mask

A very simple number mask directive for Angular that allows using a number attribute with the ngModel. In other words, the model is a number, and not a string with a mask. It was tested in Angular version 15.
This is a fork of https://github.com/cesarrew/ng2-currency-mask/

## Example App

TODO

## Getting Started

### Installing and Importing

Install the package by command:

```sh
    npm install ng2-number-mask --save
```

Import the module

```ts
import { NgxNumberMaskModule } from 'ngx-number-mask';

@NgModule({
    imports: [
        ...
        NgxNumberMaskModule
    ],
    declarations: [...],
    providers: [...]
})
export class AppModule {}
```

### Using

```html
<input numberMask [(ngModel)]="value" />
```

-   `ngModel` An attribute of type number. If is displayed `'$ 25.63'`, the attribute will be `'25.63'`.

### Options

You can set options as follows:

```html
<!-- example for pt-BR money -->
<input numberMask [(ngModel)]="value" [options]="{ prefix: 'R$ ', thousands: '.', decimal: ',' }" />
```

Available options:

-   `align` - Text alignment in input. (default: `right`)
-   `allowNegative` - If `true` can input negative values. (default: `false`)
-   `decimal` - Separator of decimals (default: `'.'`)
-   `decimalReplace` - Recognize this as decimal separator, but replace it with `decimal` decimals (default: `','`)
-   `thousands` - Separator of thousands (default: `' '`)
-   `precision` - Number of decimal places (default: `2`)
-   `prefix` - Money prefix (default: `''`)
-   `suffix` - Money suffix (default: `''`)
-   `nullable` - null value if empty (default: `'true'`)

You can also set options globally...

```ts
import { NgxNumberMaskConfig, NgxNumberMaskModule, NUMBER_MASK_CONFIG } from 'ng2-number-mask';

export const CustomNumberMaskConfig: NgxNumberMaskConfig = {
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
};

@NgModule({
    imports: [
        ...
        NgxNumberMaskModule
    ],
    declarations: [...],
    providers: [
        { provide: NUMBER_MASK_CONFIG, useValue: NgxNumberMaskConfig }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

### Validation

This directive also provides built-in validation for minimum and maximum values. If the attributes 'min' and / or 'max' are set, the Angular CSS class 'ng-invalid' will be added to the input to indicate an invalid value.

```html
<input numberMask [(ngModel)]="value" min="-10.50" max="100.75" />
```
