import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxFlipFlipSlidesService } from './services/slides.service';
import { NgxFlipFlipEventsService } from './services/events.service';
import { NgxFlipFlipWrapper } from './components/wrapper.component';
import { NgxFlipFlipSlide } from './components/slide.component';
import { NgxFlipFlipOptions } from './models/options.model';

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
