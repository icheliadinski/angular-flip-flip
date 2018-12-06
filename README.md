# ngx-flip-flip

Angular Flip Flip - Angular full page scrolling components with no dependencies

## Installation

NPM:
`npm i ngx-flip-flip`

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
export class SampleComponent implements OnInit {}
```
