import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap, map, filter, switchMap, mergeMap } from 'rxjs/operators';
import * as appActions from 'src/app/actions/app.actions';
import { HttpClient } from '@angular/common/http';
import * as errInterfaces from '../interfaces/errorAction';

@Injectable()
export class Effects {
  $handleError = createEffect(
    () => this.$actions.pipe(
      filter((action) => action.type.toLowerCase().endsWith('err')),
      map((a) => a as errInterfaces.ErrorAction),
      // filter(a => 'message' in a),
      mergeMap((action) => [
        appActions.showAlert({ messageText: action.message, severity: 'err' })
      ])
    )
  );
  constructor(private $actions: Actions, private client: HttpClient) { }

}
