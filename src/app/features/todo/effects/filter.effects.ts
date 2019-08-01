import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap, map, filter, switchMap, catchError } from 'rxjs/operators';
import * as filterActions from '../actions/filters.actions';
import { applicationStarted } from 'src/app/actions/app.actions';
import { FilterOptions } from '../reducers/filter.reducer';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TodosResponse } from '../models/interfaces/todos-response.interface';
import { TodoEntity } from '../reducers/list.reducer';
import * as listActions from '../actions/list.actions';
import { of } from 'rxjs';

@Injectable()
export class FilterEffects {

  // TODO: move this to a list effects
  $loadTodos = createEffect(() =>
    this.$actions.pipe(
      ofType(listActions.loadTodos),
      switchMap(
        () => this.client.get<TodosResponse>(environment.todosUrl).pipe(
          map(r => r.data),
          map(todos => {
            const completedIds = todos.filter(t => t.completed).map(t => t.id);
            const todoEntities = todos.map(todo => ({
              id: todo.id,
              description: todo.description
            } as TodoEntity));
            return listActions.todosLoadedOk({ completedIds, todos: todoEntities });
          }),
          catchError(
            err => of(listActions.todosLoadedErr(
              { message: `Failed to load: Server did not respond okay, or did not respond at all! exact err:${err.error};` }))),
        )
      )
    ));

  $saveFilter = createEffect(() => {
    return this.$actions.pipe(
      ofType(filterActions.setFilter), tap(a => localStorage.setItem('buttonFilter', a.filterString))
    );
  }, { dispatch: false });

  $loadFilter = createEffect(
    () => {
      return this.$actions.pipe(
        ofType(filterActions.loadFilter), // nothing app started
        map(() => localStorage.getItem('buttonFilter')), // Attempt to get the stored button filter
        filter(f => f !== null), // If it's null we just filter here to stop.
        map(f => f as FilterOptions), // Convert the piped type from the stored string, into a FilterOptions
        map((filterString: FilterOptions) => filterActions.setFilter({ filterString })), // send a setFilter with that filter to the reducer
      );
    }
  );

  constructor(private $actions: Actions, private client: HttpClient) { }

}

