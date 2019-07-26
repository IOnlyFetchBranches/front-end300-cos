import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap, map, filter, switchMap, mergeMap, catchError, concatMap } from 'rxjs/operators';
import * as filterActions from '../actions/filters.actions';
import * as appActions from 'src/app/actions/app.actions';
import { HttpClient } from '@angular/common/http';
import { loadTodos, addTodoItem, addTodoItemOk, todosAddErr, todoItemCompleted, todoItemCompletedErr, clearCompleted, deleteTodo, deleteTodoErr } from '../actions/list.actions';
import { TodoEntity } from '../reducers/list.reducer';
import { environment } from 'src/environments/environment';
import { of, EMPTY, Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';


@Injectable()
export class ListEffects {

  $deleteTodo = createEffect(() =>
    this.$actions.pipe(
      ofType(deleteTodo),
      concatMap(
        action => this.client.delete(`${environment.todosUrl}/${action.item.id}`).pipe(
          filter(x => false),
          catchError(err => of<any>(deleteTodoErr({ item: action.item, message: err })))
        )
      )
    )
    , { dispatch: true });
  $clearCompleted = createEffect(
    () => {
      return this.$actions.pipe(
        ofType(clearCompleted),
        mergeMap(action => action.items.map((todo) => deleteTodo({ item: todo })))
      );
    }
  );
  $markComplete = createEffect(
    () => this.$actions.pipe(
      ofType(todoItemCompleted),
      switchMap(
        (action) => {
          return this.client.put(`${environment.todosUrl}/completed/${action.item.id}`, action.item).pipe(
            catchError((err) => of(todoItemCompletedErr({ item: action.item })))
          );
        }
      )
    ), { dispatch: false }
  );
  $saveTodo = createEffect(
    () => (
      this.$actions.pipe(
        ofType(addTodoItem),
        // make request,
        concatMap(
          (orgAction) => this.client.post<TodoEntity>(environment.todosUrl, { description: orgAction.entity.description })
            .pipe(
              map(response => addTodoItemOk({ oldId: orgAction.entity.id, entity: response })),
              catchError((err) => of(todosAddErr({ failedId: orgAction.entity.id, message: err.error })))
            )
        )
      )
    )
  );
  constructor(private $actions: Actions, private client: HttpClient) { }

}

