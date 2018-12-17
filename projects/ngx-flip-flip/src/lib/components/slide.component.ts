import { Component } from '@angular/core';

@Component({
  selector: 'ngx-flip-flip-slide',
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: block;
      position: fixed;
      width: 100%;
    }
  `],
})
export class NgxFlipFlipSlide {
}
