import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { filter, throttleTime, tap, map, pairwise, share } from 'rxjs/operators';
import { NgxFlipFlipSlidesService } from './slides.service';
import { Direction } from '../models/direction.enum';

@Injectable()
export class NgxFlipFlipEventsService {
  fitToSectionDelay = 0;

  constructor(
    private slidesService: NgxFlipFlipSlidesService,
  ) {}

  onResize$(): Observable<Event> {
    return fromEvent(window, 'resize');
  }

  onScroll$(): Observable<Direction> {
    return fromEvent(window, 'wheel')
      .pipe(
        throttleTime(this.fitToSectionDelay),
        map((e: WheelEvent) => e.deltaY < 0 ? Direction.Up : Direction.Down),
        filter(direction => this.filterOnScroll(direction)),
        share()
      );
  }

  private filterOnScroll(direction: Direction): boolean {
    return direction === Direction.Up
      ? !this.slidesService.isTheFirstSlide()
      : !this.slidesService.isTheLastSlide();
  }
}
