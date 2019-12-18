# ngx-flip-flip

Angular Flip Flip - Angular full page scrolling components with no dependencies

[![NPM](https://nodei.co/npm/ngx-flip-flip.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ngx-flip-flip/)

[![npm version](https://badge.fury.io/js/ngx-flip-flip.svg)](https://badge.fury.io/js/ngx-flip-flip)
[![Github Downloads (total)](https://img.shields.io/github/downloads/igorexec/angular-flip-flip/total.svg)](https://www.npmjs.com/package/ngx-flip-flip)

---
[Demo](https://ngx-flip-flip.netlify.com/)

---

## Installation

NPM:
`npm i ngx-flip-flip --save`

Yarn:
`yarn add ngx-flip-flip`

## Sample

Include NgxFlipFlipModule in your main module:

```typescript
import { NgxFlipFlipModule } from 'ngx-flip-flip';

@NgModule({
  // ...
  imports: [
    NgxFlipFlipModule.forRoot(),
  ],
  // ...
})
export class AppModule { }
```

Then use in your component:

```typescript
import { Component } from '@angular/core';

@Component({
  // ...
  template: `
    <ngx-flip-flip-wrapper>
      <ngx-flip-flip-slide>1</ngx-flip-flip-slide>
      <ngx-flip-flip-slide>2</ngx-flip-flip-slide>
      // ...
    </ngx-flip-flip-wrapper>
  `,
})
export class SampleComponent {}
```

## Options

Change options

```typescript
import { Component } from '@angular/core';
import { NgxFlipFlipOptions } from 'ngx-flip-flip'

@Component({
  // ...
  template: `
    <ngx-flip-flip-wrapper [options]="options">
      <ngx-flip-flip-slide>1</ngx-flip-flip-slide>
      <ngx-flip-flip-slide>2</ngx-flip-flip-slide>
      // ...
    </ngx-flip-flip-wrapper>
  `,
})
export class SampleComponent {
  options: NgxFlipFlipOptions = {
    scrollingSpeed:    300,      // Scrolling speed - number
    fitToSectionDelay: 300,      // Fit to section delay - number
    easing:            'linear', // animation type. One of 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'step-start' | 'step-end'
    startFromSlide:    1,        // start from this slide - number
    keyboardScrolling: false     // should keyboard scrolling work - boolean
  }
}
```

On slide change event

```typescript
import { Component } from '@angular/core';
import { NgxFlipFlipOptions, Direction } from 'ngx-flip-flip'

@Component({
  // ...
  template: `
    <ngx-flip-flip-wrapper (onSlideChane)="handleSlideChange($event)">
      <ngx-flip-flip-slide>1</ngx-flip-flip-slide>
      <ngx-flip-flip-slide>2</ngx-flip-flip-slide>
      // ...
    </ngx-flip-flip-wrapper>
  `,
})
export class SampleComponent {
  handleSlideChange(direction: Direction) {
    // do some stuff
  }
}
```
