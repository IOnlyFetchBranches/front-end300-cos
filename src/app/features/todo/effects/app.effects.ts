import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap, map, filter, switchMap, mergeMap } from 'rxjs/operators';
import * as filterActions from '../actions/filters.actions';
import * as appActions from 'src/app/actions/app.actions';
import { HttpClient } from '@angular/common/http';
import { loadTodos } from '../actions/list.actions';

@Injectable()
export class AppEffects {


  $startFeature = createEffect(
    () => this.$actions.pipe(
      ofType(appActions.applicationStarted),
      mergeMap(() => [
        loadTodos(), filterActions.loadFilter()
      ])
    )
  );
  constructor(private $actions: Actions, private client: HttpClient) { }

}

