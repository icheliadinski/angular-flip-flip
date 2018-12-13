import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { filter, throttleTime, tap, map, pairwise } from 'rxjs/operators';
import { NgxFlipFlipSlidesService } from './slides.service';
import { Direction } from '../models/direction.enum';

@Injectable()
export class NgxFlipFlipEventsService {
  fitToSectionDelay = 0;

  constructor(
    private slidesService: NgxFlipFlipSlidesService,
  ) {}

  onNextSlide(): Observable<Direction> {
    return this.onScroll()
      .pipe(
        filter(direction => direction === Direction.Down && !this.slidesService.isTheLastSlide())
      );
  }

  onPrevSlide(): Observable<Direction> {
    return this.onScroll()
      .pipe(
        filter(direction => direction === Direction.Up && !this.slidesService.isTheFirstSlide())
      );
  }

  onResize(): Observable<Event> {
    return fromEvent(window, 'resize');
  }

  private onScroll(): Observable<Direction> {
    return fromEvent(window, 'wheel')
      .pipe(
        throttleTime(this.fitToSectionDelay),
        map((e: WheelEvent) => e.deltaY < 0 ? Direction.Up : Direction.Down)
      );
  }
}
