import { Component, OnInit, OnDestroy, Renderer2, ElementRef, Input, DoCheck, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxFlipFlipSlidesService } from '../../services/slides.service';
import { NgxFlipFlipEventsService } from '../../services/events.service';
import { NgxFlipFlipOptions } from '../../models/options.model';

@Component({
  selector: 'ngx-flip-flip-wrapper',
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class NgxFlipFlipWrapper implements OnInit, DoCheck, OnDestroy {
  @Input() options: NgxFlipFlipOptions = {
    scrollingSpeed: 700,
    easing: 'ease',
    fitToSectionDelay: 500,
  };

  private _resizeSubscription: Subscription;
  private _onNextSubscription: Subscription;
  private _onPrevSubscription: Subscription;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private slidesService: NgxFlipFlipSlidesService,
    private eventsService: NgxFlipFlipEventsService,
    private _zone: NgZone,
  ) {}

  ngDoCheck() {
    console.log('change detector');
  }

  ngOnInit() {
    this._zone.runOutsideAngular(() => window.addEventListener('wheel', this.disableWheel));
    this.slidesService.slides = document.querySelectorAll('ngx-flip-flip-slide');
    this.slidesService.selectedId = 0;
    this.eventsService.fitToSectionDelay = this.options.fitToSectionDelay + this.options.scrollingSpeed;

    this._zone.runOutsideAngular(() => {
      this._resizeSubscription = this.eventsService.onResize().subscribe(() => {
        this._zone.run(() => {
          this.changeSlidesDimensions();
          this.changeSlide();
        });
      });
      this._onNextSubscription = this.eventsService.onNextSlide().subscribe(() => {
        this._zone.run(() => {
          this.slidesService.selectedId++;
          this.changeSlide();
        });
      });
      this._onPrevSubscription = this.eventsService.onPrevSlide().subscribe(() => {
        this._zone.run(() => {
          this.slidesService.selectedId--;
          this.changeSlide();
        });
      });
    });

    this.addStyles();
  }

  ngOnDestroy() {
    window.removeEventListener('wheel', this.disableWheel);
    this._resizeSubscription.unsubscribe();
    this._onNextSubscription.unsubscribe();
    this._onPrevSubscription.unsubscribe();
  }

  private changeSlidesDimensions = () => {
    this.slidesService.slides.forEach(slide => this.renderer.setStyle(slide, 'height', `${window.innerHeight}px`));
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
}
