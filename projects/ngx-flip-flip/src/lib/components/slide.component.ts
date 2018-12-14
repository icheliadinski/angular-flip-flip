import { Component } from '@angular/core';

@Component({
  selector: 'ngx-flip-flip-slide',
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `],
})
export class NgxFlipFlipSlide {
}
