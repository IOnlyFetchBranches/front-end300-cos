import { createAction, props } from '@ngrx/store';
import { TodoEntity } from '../reducers/list.reducer';


let fakeId = 99;
export const addTodoItem = createAction(
  '[todosfeature] add item',
  (description: string) => {
    const newItem: TodoEntity = {
      id: 'F' + fakeId++,
      description
    };
    return { entity: newItem };
  }
);

export const addTodoItemOk = createAction(
  '[todosfeature] added todo ok',
  props<{ oldId: string, entity: TodoEntity }>()
);

export const todoItemCompleted = createAction(
  '[todosfeature] todo item completed',
  props<{ item: TodoEntity }>()
);

export const todoItemCompletedOk = createAction(
  '[todosfeature] todo item completed ok',
  props<{ item: TodoEntity }>()
);

export const todoItemCompletedErr = createAction(
  '[todosfeature] todo item completed err',
  props<{ item: TodoEntity }>()
);

export const clearCompleted = createAction(
  '[todosfeature] completed todos cleared',
  props<{ items: TodoEntity[] }>()
);
export const clearCompletedOk = createAction(
  '[todosfeature] completed todos cleared ok',
  props<{ items: TodoEntity[] }>()
);
export const clearCompletedErr = createAction(
  '[todosfeature] completed todos cleared err',
  props<{ items: TodoEntity[] }>()
);

export const deleteTodo = createAction(
  '[todosfeature] delete todo',
  props<{ item: TodoEntity }>()
);
export const deleteTodoErr = createAction(
  '[todosfeature] delete todo err',
  props<{ item: TodoEntity, message: any }>()
);
export const deleteTodoOk = createAction(
  '[todosfeature] delete todo ok',
  props<{ item: TodoEntity }>()
);
export const todosLoadedOk = createAction(
  '[todosfeature] todos loaded ok',
  props<{ completedIds: string[], todos: TodoEntity[] }>()
);
export const todosAddErr = createAction(
  '[todosfeature] todo add err',
  props<{ failedId: string, message: string }>()
);

export const loadTodos = createAction(
  '[todosfeature] load todos'
);

