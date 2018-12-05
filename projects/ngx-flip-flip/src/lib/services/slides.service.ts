import { Injectable } from '@angular/core';

@Injectable()
export class NgxFlipFlipSlidesService {
  private _slides: NodeListOf<HTMLElement>;
  private _selectedId: number;

  get slides() {
    return this._slides;
  }
  set slides(slides: NodeListOf<HTMLElement>) {
    this._slides = slides;
  }

  get selectedId() {
    return this._selectedId;
  }
  set selectedId(id: number) {
    this._selectedId = id;
  }

  isTheFirstSlide() {
    return this._selectedId === 0;
  }

  isTheLastSlide() {
    return this._selectedId === this._slides.length - 1;
  }
}
