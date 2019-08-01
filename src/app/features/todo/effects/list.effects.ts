import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap, map, filter, switchMap, mergeMap, catchError, concatMap } from 'rxjs/operators';
import * as filterActions from '../actions/filters.actions';
import * as appActions from 'src/app/actions/app.actions';
import { HttpClient } from '@angular/common/http';
import { loadTodos, addTodoItem, addTodoItemOk, todosAddErr, todoItemCompleted, todoItemCompletedErr, clearCompleted, deleteTodo, deleteTodoErr, deleteTodoOk, todoItemCompletedOk } from '../actions/list.actions';
import { TodoEntity } from '../reducers/list.reducer';
import { environment } from 'src/environments/environment';
import { of, EMPTY, Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';


@Injectable()
export class ListEffects {

  $deleteTodo = createEffect(() =>
    this.$actions.pipe(
      ofType(deleteTodo),
      concatMap((action) => this.client.delete(`${environment.todosUrl}/${action.item.id}`).pipe(
        map(response => {
          return deleteTodoOk({ item: action.item });
        }),
        catchError(
          err => of(
            deleteTodoErr({
              item: action.item,
              message: `Failed to delete ${action.item.description} from your list. err: ${err.error} `
            }))
        )
      )
      )
    ));
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
            map((response) => {
              return todoItemCompletedOk({ item: action.item });
            }),
            catchError(
              (err) => of(
                todoItemCompletedErr(
                  { item: action.item, message: `Failed to mark "${action.item.description}" as completed. err: ${err.error}` })))
          );
        }
      )
    ));
  $saveTodo = createEffect(
    () => (
      this.$actions.pipe(
        ofType(addTodoItem),
        // make request,
        concatMap(
          (orgAction) => this.client.post<TodoEntity>(environment.todosUrl, { description: orgAction.entity.description })
            .pipe(
              map(response => addTodoItemOk({ oldId: orgAction.entity.id, entity: response })),
              catchError((err) => of(todosAddErr({ failedId: orgAction.entity.id, message: `Failed to save todo. err: ${err.error}` })))
            )
        )
      )
    )
  );
  constructor(private $actions: Actions, private client: HttpClient) { }

}

