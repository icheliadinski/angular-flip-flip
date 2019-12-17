import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxFlipFlipSlidesService, NgxFlipFlipEventsService } from './services';
import { NgxFlipFlipWrapper, NgxFlipFlipSlide } from './components';

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
