import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { filter, throttleTime, map, share, merge, pairwise } from 'rxjs/operators';
import { NgxFlipFlipSlidesService } from './slides.service';
import { Direction } from '../models/direction.enum';
import { KeyboardEnum } from '../models/keyboard.enum';

@Injectable()
export class NgxFlipFlipEventsService {
  fitToSectionDelay: number;
  isArrowNavigationActive: boolean;

  constructor(
    private slidesService: NgxFlipFlipSlidesService
  ) {}

  onResize$(): Observable<Event> {
    return fromEvent(window, 'resize');
  }

  onSlideChange$(): Observable<Direction> {
    return this.onWheel$()
      .pipe(
        merge(this.onKeyPress$()),
        merge(this.onScroll$())
      )
      .pipe(
        throttleTime(this.fitToSectionDelay),
        filter(direction => this.filterOnScroll(direction)),
        share()
      );
  }

  private onWheel$() {
    return fromEvent(window, 'wheel').pipe(
      map((e: WheelEvent) => e.deltaY < 0 ? Direction.Up : Direction.Down)
    );
  }

  private onKeyPress$() {
    return fromEvent(window, 'keydown').pipe(
      filter(() => this.isArrowNavigationActive),
      filter((e: KeyboardEvent) => e.key === KeyboardEnum.ArrowUp || e.key === KeyboardEnum.ArrowDown),
      map((e: KeyboardEvent) => e.key === KeyboardEnum.ArrowUp ? Direction.Up : Direction.Down)
    );
  }

  private onScroll$() {
    return fromEvent(window, 'scroll').pipe(
      map((e: TouchEvent) => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => y2 < y1 ? Direction.Up : Direction.Down)
    );
  }

  private filterOnScroll(direction: Direction): boolean {
    return direction === Direction.Up
      ? !this.slidesService.isTheFirstSlide()
      : !this.slidesService.isTheLastSlide();
  }
}
