import { createReducer, on, State } from '@ngrx/store';
import * as appActions from '../actions/app.actions';

export interface AlertState {
  alertIsShowing: boolean;
  alertText: string;
  alertType: appActions.AlertSeverityOptions;
}

const initialState = {
  alertIsShowing: false,
  alertText: '',
  alertType: null,
};

const myReducer = createReducer(
  initialState,
  on(appActions.showAlert, (_, action) => ({ alertIsShowing: true, alertText: action.messageText, alertType: action.severity })),
  on(appActions.dismissAlert, (_, __) => ({ alertIsShowing: false, alertText: '', alertType: null })),
);
export const reducer = (state, action) => {
  return myReducer(state, action);
};
