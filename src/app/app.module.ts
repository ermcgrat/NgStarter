import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';

import { AppComponent } from './app.component';
import { AppStateService } from './app.state.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [AppStateService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private appRef: ApplicationRef, private stateService: AppStateService) {
    console.log('AppModule constructor');
  }

  hmrOnInit(prevState: any) {
    if (prevState) {
      this.stateService.saveAppState(prevState);
      // change detection.
      // We have to do this because no "event" came from Angular, so it doesn't know to run change detection.
      // Remember this method call is coming from Webpack hmr, not Angular.
      this.appRef.tick();
    }
    console.log('AppModule hmrOnInit', prevState);
  }

  hmrOnDestroy(data: any) {
    // Here we will increment our hmrBuilds counter, and then save our state to
    // data (module.hot.data), so that it will be available to the new module.
    const hmrBuilds = this.stateService.getHmrBuilds() + 1;
    this.stateService.saveHmrBuilds(hmrBuilds);
    data.appState = this.stateService.getAppState();

    console.log('AppModule hmrOnDestroy', JSON.parse(JSON.stringify(data)));
  }
}
