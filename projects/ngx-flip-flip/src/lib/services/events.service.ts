import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { filter, throttleTime, map, share, merge } from 'rxjs/operators';
import { NgxFlipFlipSlidesService } from './slides.service';
import { Direction } from '../models/direction.enum';
import { KeyboardEnum } from '../models/keyboard.enum';

@Injectable()
export class NgxFlipFlipEventsService {
  fitToSectionDelay;
  isArrowNavigationActive;

  constructor(
    private slidesService: NgxFlipFlipSlidesService,
  ) {}

  onResize$(): Observable<Event> {
    return fromEvent(window, 'resize');
  }

  onSlideChange$(): Observable<Direction> {
    return this.onScroll$()
      .pipe(
        merge(this.onKeyPress$())
      )
      .pipe(
        throttleTime(this.fitToSectionDelay),
        filter(direction => this.filterOnScroll(direction)),
        share()
      );
  }

  private onScroll$() {
    return fromEvent(window, 'wheel').pipe(
      map((e: WheelEvent) => e.deltaY < 0 ? Direction.Up : Direction.Down)
    );
  }

  private onKeyPress$() {
    return fromEvent(window, 'keydown').pipe(
      filter(() => this.isArrowNavigationActive),
      map((e: KeyboardEvent) => e.key === KeyboardEnum.ArrowUp ? Direction.Up : Direction.Down)
    );
  }

  private filterOnScroll(direction: Direction): boolean {
    return direction === Direction.Up
      ? !this.slidesService.isTheFirstSlide()
      : !this.slidesService.isTheLastSlide();
  }
}
