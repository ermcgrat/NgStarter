import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AppStateService {

  // attach various component states to this object
  // We maintain an object for synchronous use by the HMR, and an Observable for use by the application and its templates.
  private appState: IAppState = { hmrBuilds: 0 };
  private appStateSubject = new BehaviorSubject<IAppState>({ hmrBuilds: 0 });
  public appState$: Observable<IAppState> = this.appStateSubject.asObservable();

  constructor() { }

  public getAppState() {
    return this.appState;
  }

  public getHmrBuilds(): number {
    return this.appState.hmrBuilds ? this.appState.hmrBuilds : 0;
  }

  public saveAppState(newState: IAppState) {
    this.appState = newState;
    this.appStateSubject.next(newState);
  }

  public saveHmrBuilds(buildNum: number) {
    this.appState.hmrBuilds = buildNum;
  }

}

export interface IAppState {
  hmrBuilds?: number;
}
