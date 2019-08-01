import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, selectBootStrapAlertType, selectAlertMessage, selectAlertShowing } from 'src/app/reducers';
import { Observable } from 'rxjs';
import * as appActions from 'src/app/actions/app.actions';

@Component({
  selector: 'app-alert-bar',
  templateUrl: './alert-bar.component.html',
  styleUrls: ['./alert-bar.component.scss']
})
export class AlertBarComponent implements OnInit {

  $message: Observable<string>;
  $type: Observable<string>;
  $showing: Observable<boolean>;

  constructor(private store: Store<State>) {

  }

  dismissAlert() {
    this.store.dispatch(appActions.dismissAlert());
  }


  ngOnInit() {
    this.$type = this.store.select(selectBootStrapAlertType);
    this.$message = this.store.select(selectAlertMessage);
    this.$showing = this.store.select(selectAlertShowing);
  }

}
