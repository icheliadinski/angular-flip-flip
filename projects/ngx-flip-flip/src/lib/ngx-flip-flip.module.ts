import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxFlipFlipSlidesService } from './services/slides.service';
import { NgxFlipFlipEventsService } from './services/events.service';
import { NgxFlipFlipWrapper } from './components/wrapper/wrapper.component';
import { NgxFlipFlipSlide } from './components/slide/slide.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NgxFlipFlipWrapper,
    NgxFlipFlipSlide,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NgxFlipFlipWrapper,
    NgxFlipFlipSlide,
  ],
  providers: [
    NgxFlipFlipEventsService,
    NgxFlipFlipSlidesService,
  ],
})
export class NgxFlipFlipModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: NgxFlipFlipModule,
        providers: [],
    };
  }
}
