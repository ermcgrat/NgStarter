import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  changeTitle() {
    // note that this modified state would be lost in an HMR recompilation
    // unless we do something explicitly to somehow save it before angular is
    // torn down and then reconstructed.
    this.title = 'Title changed';
  }
}
