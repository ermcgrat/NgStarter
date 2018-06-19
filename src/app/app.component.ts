import { Component, OnInit } from '@angular/core';
import { AppStateService, IAppState } from './app.state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  public appState$: Observable<IAppState>;

  constructor(private stateService: AppStateService) {
    console.log('App Component constructed');
  }

  ngOnInit() {
    console.log('App Component OnInit');
    this.appState$ = this.stateService.appState$;
  }

  changeTitle() {
    // note that this modified state would be lost in an HMR recompilation
    // unless we do something explicitly to somehow save it before angular is
    // torn down and then reconstructed.
    this.title = 'Title changed';
  }
}
