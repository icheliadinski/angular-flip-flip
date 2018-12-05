import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { filter, throttleTime, tap, map } from 'rxjs/operators';
import { NgxFlipFlipSlidesService } from './slides.service';

@Injectable()
export class NgxFlipFlipEventsService {
  fitToSectionDelay = 0;

  constructor(
    private slidesService: NgxFlipFlipSlidesService,
  ) {}

  onNextSlide(): Observable<number> {
    return this.onScroll()
      .pipe(
        filter((e: WheelEvent) => e.deltaY > 0 && !this.slidesService.isTheLastSlide()),
        map(() => this.slidesService.selectedId++)
      );
  }

  onPrevSlide(): Observable<number> {
    return this.onScroll()
      .pipe(
        filter((e: WheelEvent) => e.deltaY < 0 && !this.slidesService.isTheFirstSlide()),
        map(() => this.slidesService.selectedId--)
      );
  }

  onResize(): Observable<Event> {
    return fromEvent(window, 'resize');
  }

  private onScroll(): Observable<Event> {
    return fromEvent(window, 'wheel')
      .pipe(
        throttleTime(this.fitToSectionDelay)
      );
  }
}
