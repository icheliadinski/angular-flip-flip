import { Component, OnInit, OnDestroy, Renderer2, ElementRef, Input, NgZone, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxFlipFlipSlidesService, NgxFlipFlipEventsService } from '../services';
import { NgxFlipFlipOptions, Direction } from '../models';

@Component({
  selector: 'ngx-flip-flip-wrapper',
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class NgxFlipFlipWrapper implements OnInit, OnDestroy {
  @Input() options: NgxFlipFlipOptions = {
    scrollingSpeed: 700,
    easing: 'ease',
    fitToSectionDelay: 500,
    startFromSlide: 0,
    keyboardScrolling: true,
  };
  @Output() onSlideChange = new EventEmitter<Direction>();

  private _resizeSubscription: Subscription;
  private _onScrollSubscription: Subscription;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private slidesService: NgxFlipFlipSlidesService,
    private eventsService: NgxFlipFlipEventsService,
    private _zone: NgZone,
  ) {}

  ngOnInit() {
    this.slidesService.slides = document.querySelectorAll('ngx-flip-flip-slide');

    this.eventsService.fitToSectionDelay = this.options.fitToSectionDelay + this.options.scrollingSpeed;
    this.eventsService.isArrowNavigationActive = this.options.keyboardScrolling;
    this.slidesService.selectedId = this.options.startFromSlide;
    this.changeSlide();

    this._zone.runOutsideAngular(() => window.addEventListener('wheel', this.disableWheel));
    this._zone.runOutsideAngular(() => {

      this._onScrollSubscription = this.eventsService.onSlideChange$().subscribe(direction => {
        this._zone.run(() => {
          this.slidesService.selectedId = this.getSelectedSlideId(direction);
          this.changeSlide();
          this.onSlideChange.emit(direction);
        });
      });

      this._resizeSubscription = this.eventsService.onResize$().subscribe(() => {
        this._zone.run(() => {
          this.changeSlidesDimensions();
          this.changeSlide();
        });
      });

    });

    this.changeSlidesDimensions();
    this.addStyles();
  }

  ngOnDestroy() {
    window.removeEventListener('wheel', this.disableWheel);
    this._resizeSubscription.unsubscribe();
    this._onScrollSubscription.unsubscribe();
  }

  private changeSlidesDimensions = () => {
    this.slidesService.slides.forEach((slide, index) => {
      this.renderer.setStyle(slide, 'height', `${window.innerHeight}px`);
      this.renderer.setStyle(slide, 'top', `${window.innerHeight * index}px`);
    });
  }

  private changeSlide() {
    const offset = -window.innerHeight * this.slidesService.selectedId;
    this.moveTo(offset);
  }

  private moveTo(offset: number) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'transform', `translateY(${offset}px)`);
  }

  private disableWheel(e: Event) {
    e.preventDefault();
  }

  private addStyles() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'transition', `transform ${this.options.scrollingSpeed}ms ${this.options.easing}`);
    this.renderer.setStyle(document.body, 'margin', 0);
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  private getSelectedSlideId(direction: Direction): number {
    return direction === Direction.Down ? this.slidesService.selectedId + 1 : this.slidesService.selectedId - 1;
  }
}
