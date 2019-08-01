export const featureName = 'appFeature';
import * as fromAlerts from './alert.reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface State {
  alerts: fromAlerts.AlertState;
}

export const reducers = {
  alerts: fromAlerts.reducer,
};



const selectAlertsBranch = (state: State) => state.alerts;

export const selectAlertShowing = createSelector(selectAlertsBranch, (a) => a.alertIsShowing);
export const selectAlertMessage = createSelector(selectAlertsBranch, (a) => a.alertText);
export const selectBootStrapAlertType = createSelector(selectAlertsBranch, (a) => {
  switch (a.alertType) {
    case 'err':
      return 'danger';
    case 'warn':
      return 'warning';
    case 'info':
      return 'info';
  }
});

export const selectAlertInfo = createSelector(selectAlertShowing, selectAlertMessage, selectBootStrapAlertType,
  (showing, msg, type) => ({ alertIsShowing: showing, message: msg, alertType: type }));
