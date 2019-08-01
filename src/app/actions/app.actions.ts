import { createAction, props } from '@ngrx/store';

export type AlertSeverityOptions = 'err' | 'warn' | 'info';

export const applicationStarted = createAction(
  '[app] application started'
);

export const showAlert = createAction(
  '[app] show Alert',
  props<{ messageText: string, severity: AlertSeverityOptions }>()
);

export const dismissAlert = createAction(
  '[app] dismiss Alert'
);
