import { NgModuleRef, ApplicationRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
  console.log('hmrBootstrap called');

  // we always accept the module
  module.hot.accept();

  // bootstrap this new module, then get a reference to it when done.
  bootstrap().then(mod => {

    // Attach a dispose handler. When this module is replaced, we will first run this code before
    // evaluating the new module. (eg. running main.ts)
    // This method will inject a NEW blank object that you can then access under module.hot.data
    // later when the new module is evaluated. (onInit below)
    module.hot.dispose(data => {

      // does this module have an onDestroy method that we need to call before destroying it?
      if (mod.instance.hmrOnDestroy) {
        mod.instance.hmrOnDestroy(data);
      }

      const appRef: ApplicationRef = mod.injector.get(ApplicationRef);
      const elements = appRef.components.map(c => c.location.nativeElement);
      const makeVisible = createNewHosts(elements);
      mod.destroy();
      makeVisible();
      console.log('module disposed');
    });

    // Does this module have an hmrOnInit method for us to run?
    // And is there state data from previous unloaded module to initalize?
    let prevData;
    if (module.hot.data && module.hot.data.appState) {
      prevData = module.hot.data.appState;
    }
    if (mod.instance.hmrOnInit && prevData) {
      // Note that the application has already been bootstrapped, all components have been created
      // and ran their own constructors and OnInit functions.
      // So if we update the AppStateService here, those components will need to refetch their data from it.
      // Alternatively we could use observables for the state.
      // Or have the components reference the state object directly, which is less ideal.
      mod.instance.hmrOnInit(prevData);
    }

  });
};
